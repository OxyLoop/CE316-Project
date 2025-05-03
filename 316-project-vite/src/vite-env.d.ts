/// <reference types="vite/client" />

declare global {
  interface Window {
    electronAPI: {
      runJava: (filePath: string, args: string[]) => Promise<{
        output: string;
        error: string;
      }>;
      runC: (filePath: string, args: string[]) => Promise<{
        output: string;
        error: string;
      }>;
      runPython: (filePath: string, args: string[]) => Promise<{
        output: string;
        error: string;
      }>;
    };
  }
}

export {};
