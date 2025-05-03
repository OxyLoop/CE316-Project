// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

// Frontend'e açılacak güvenli API
contextBridge.exposeInMainWorld("electronAPI", {
  runJava: (filePath, args) => ipcRenderer.invoke("run-java", filePath, args),
  runC: (filePath, args) => ipcRenderer.invoke("run-c", filePath, args),
  runPython: (filePath, args) => ipcRenderer.invoke("run-python", filePath, args),
});
