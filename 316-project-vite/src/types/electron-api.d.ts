export {};

declare global {
  interface Window {
    electronAPI: {
      runJava: (filePath: string, args: string[]) => Promise<{
        output: string;
        error: string;
      }>;
    };
  }
}
