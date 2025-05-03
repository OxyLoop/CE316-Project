const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // frontend ile köprü kuracak dosya
    },
  });

  win.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


// 🧠 Requirement 7: Java Compile & Run IPC Handler
ipcMain.handle("run-java", async (event, javaFilePath, args = []) => {
  const dir = path.dirname(javaFilePath);
  const fileName = path.basename(javaFilePath, ".java");

  // 1. Compile step
  const compileCmd = `javac ${fileName}.java`;
  const runCmd = `java ${fileName} ${args.join(" ")}`;

  return new Promise((resolve) => {
    exec(compileCmd, { cwd: dir }, (compileErr, _, compileStderr) => {
      if (compileErr) {
        return resolve({ output: "", error: compileStderr || "Compilation failed." });
      }

      // 2. Run step
      exec(runCmd, { cwd: dir }, (runErr, runStdout, runStderr) => {
        if (runErr) {
          return resolve({ output: "", error: runStderr || "Execution failed." });
        }
        return resolve({ output: runStdout, error: "" });
      });
    });
  });
});
