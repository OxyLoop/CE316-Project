// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runJava: (filePath, args) => ipcRenderer.invoke("run-java", filePath, args),
  runC: (filePath, args) => ipcRenderer.invoke("run-c", filePath, args),
  runPython: (filePath, args) => ipcRenderer.invoke("run-python", filePath, args),
  extractAndRun: (zipPath, args, language) =>
    ipcRenderer.invoke("extract-and-run", zipPath, args, language), // ✅ EKLENDİ
});
