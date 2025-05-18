/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI: {
      runJava: (filePath: string, args: string[]) => Promise<{ output: string; error: string }>;
      runC: (filePath: string, args: string[]) => Promise<{ output: string; error: string }>;
      runPython: (filePath: string, args: string[]) => Promise<{ output: string; error: string }>;
      extractAndRun: (
        zipPath: string,
        args: string[],
        language: string
      ) => Promise<{ output: string; error: string }>;
      openUserManual: () => Promise<void>;
    };
  }
}

export {};
