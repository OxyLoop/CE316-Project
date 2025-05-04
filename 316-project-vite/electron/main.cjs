const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const unzipper = require("unzipper");
const os = require("os");

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

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 🧠 Dilleri çalıştıran yardımcı fonksiyonlar
async function runJava(filePath, args = []) {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath, ".java");
  const compileCmd = `javac ${fileName}.java`;
  const runCmd = `java ${fileName} ${args.join(" ")}`;

  return new Promise((resolve) => {
    exec(compileCmd, { cwd: dir }, (err, _, stderr) => {
      if (err) return resolve({ output: "", error: stderr || "Java compile failed." });

      exec(runCmd, { cwd: dir }, (err2, stdout, stderr2) => {
        if (err2) return resolve({ output: "", error: stderr2 || "Java run failed." });
        resolve({ output: stdout, error: "" });
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

// ✅ ZIP'ten çıkar ve ilgili dili çalıştır
ipcMain.handle("extract-and-run", async (event, zipPath, args = [], language) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ce316-"));

  try {
    await fs.createReadStream(zipPath).pipe(unzipper.Extract({ path: tempDir })).promise();

    const ext = language === "java" ? ".java" : language === "c" ? ".c" : ".py";
    const files = fs.readdirSync(tempDir);
    const mainFile = files.find(f => f.endsWith(ext));

    if (!mainFile) {
      return { output: "", error: `No ${ext} file found in ZIP.` };
    }

    const fullPath = path.join(tempDir, mainFile);

    if (language === "java") return await runJava(fullPath, args);
    if (language === "c") return await runC(fullPath, args);
    if (language === "python") return await runPython(fullPath, args);

    return { output: "", error: "Unsupported language." };
  } catch (err) {
    return { output: "", error: err.message || "Extraction or execution failed." };
  }
});
