const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runJava: (filePath, args) => ipcRenderer.invoke("run-java", filePath, args),
  runC: (filePath, args) => ipcRenderer.invoke("run-c", filePath, args),
  runPython: (filePath, args) => ipcRenderer.invoke("run-python", filePath, args),

  // ✅ Tek bir ZIP dosyasını çalıştır
  extractAndRun: (zipPath, args, language) =>
    ipcRenderer.invoke("extract-and-run", zipPath, args, language),

  // ✅ Kullanıcıdan çoklu zip seçtir
  selectMultipleZips: () =>
    ipcRenderer.invoke("select-multiple-zips"),

  // ✅ Seçilen zip'leri sırayla çalıştır
  runMultipleZips: (zipPaths, args, language) =>
    ipcRenderer.invoke("run-multiple-zips", zipPaths, args, language),

  // ✅ Kullanım kılavuzu PDF aç
  openUserManual: () => ipcRenderer.invoke("open-user-manual"),
});
