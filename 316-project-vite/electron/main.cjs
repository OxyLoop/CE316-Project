const { app, BrowserWindow, ipcMain,shell ,dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const unzipper = require("unzipper");
const os = require("os");

console.log("main.cjs baslatildi");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../dist/index.html"));
}
ipcMain.handle("open-user-manual", async () => {
  const isDev = !app.isPackaged;
  const pdfPath = isDev
    ? path.join(__dirname, "..", "public", "UserManual.pdf")  // dev
    : path.join(process.resourcesPath, "UserManual.pdf");      // exe

  console.log("📄 Açılacak PDF:", pdfPath);
  return await shell.openPath(pdfPath);
});


app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function findSourceFilesRecursive(dir, extension) {
  let result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result = result.concat(findSourceFilesRecursive(fullPath, extension));
    } else if (entry.name.toLowerCase().endsWith(extension)) {
      result.push(fullPath);
    }
  }

  return result;
}

async function runJava(filePath, args = []) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath, ".java");
  const compileCmd = `javac ${fileName}.java`;
  const runCmd = `java -cp . ${fileName} ${args.join(" ")}`;

  console.log("Derleme komutu:", compileCmd);
  console.log("Calistirma komutu:", runCmd);

  return new Promise((resolve) => {
    exec(compileCmd, { cwd: dir }, (err, _, stderr) => {
      if (err) {
        console.log("Derleme hatasi:", stderr);
        return resolve({ output: "", error: stderr || "Java compile failed." });
      }

      exec(runCmd, { cwd: dir }, (err2, stdout, stderr2) => {
        if (err2) {
          console.log("Calistirma hatasi:", stderr2);
          return resolve({ output: "", error: stderr2 || "Java run failed." });
        }

        const output = stdout.trim();
        console.log(output.length === 0 ? "Java cikti yok." : "Java cikti:", output);
        resolve({ output, error: "" });
      });
    });
  });
}

async function runC(filePath, args = []) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath, ".c");
  const compileCmd = `gcc ${fileName}.c -o ${fileName}.exe`;
  const runCmd = `${fileName}.exe ${args.join(" ")}`;

  return new Promise((resolve) => {
    exec(compileCmd, { cwd: dir }, (err, _, stderr) => {
      if (err) return resolve({ output: "", error: stderr || "C compile failed." });

      exec(runCmd, { cwd: dir }, (err2, stdout, stderr2) => {
        if (err2) return resolve({ output: "", error: stderr2 || "C run failed." });
        resolve({ output: stdout, error: "" });
      });
    });
  });
}

async function runPython(filePath, args = []) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const runCmd = `python "${fileName}" ${args.join(" ")}`;

  return new Promise((resolve) => {
    exec(runCmd, { cwd: dir }, (err, stdout, stderr) => {
      if (err) return resolve({ output: "", error: stderr || "Python run failed." });
      resolve({ output: stdout, error: "" });
    });
  });
}

ipcMain.handle("extract-and-run", async (event, zipPath, args = [], language) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ce316-"));
  console.log("ZIP cikartildi:", tempDir);

  try {
    await fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: tempDir })).promise();
    language = language.toLowerCase();
    const ext = language === "java" ? ".java" : language === "c" ? ".c" : ".py";
    const sourceFiles = findSourceFilesRecursive(tempDir, ext);

    if (sourceFiles.length === 0) {
      return { output: "", error: `No ${ext} file found in ZIP.` };
    }

    const fullPath = sourceFiles[0];
    if (language === "java") return await runJava(fullPath, args);
    if (language === "c") return await runC(fullPath, args);
    if (language === "python") return await runPython(fullPath, args);
    return { output: "", error: "Unsupported language." };
  } catch (err) {
    return { output: "", error: err.message || "Extraction or execution failed." };
  }
});

ipcMain.handle("select-multiple-zips", async () => {
  return await dialog.showOpenDialog({
    title: "ZIP dosyalarini sec",
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "ZIP Files", extensions: ["zip"] }],
  });
});

ipcMain.handle("run-multiple-zips", async (event, zipPaths, args = [], language) => {
  const results = [];

  for (const zipPath of zipPaths) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ce316-"));
    await fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: tempDir })).promise();

    const ext = language.toLowerCase() === "java" ? ".java" : language === "c" ? ".c" : ".py";
    const sourceFiles = findSourceFilesRecursive(tempDir, ext);
    const fullPath = sourceFiles[0];

    let result;
    if (!fullPath) {
      result = { output: "", error: `No ${ext} file found.` };
    } else if (language === "java") result = await runJava(fullPath, args);
    else if (language === "c") result = await runC(fullPath, args);
    else if (language === "python") result = await runPython(fullPath, args);
    else result = { output: "", error: "Unsupported language." };

    results.push({ zip: path.basename(zipPath), ...result });
  }

  return results;
});
