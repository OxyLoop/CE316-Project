// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

// Frontend'e açılacak güvenli API
contextBridge.exposeInMainWorld("electronAPI", {
  runJava: (javaFilePath, args) =>
    ipcRenderer.invoke("run-java", javaFilePath, args),
});
