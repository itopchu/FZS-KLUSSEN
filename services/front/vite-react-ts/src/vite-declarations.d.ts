declare module 'vite' {
    interface UserConfig {
      plugins?: any[];
      define?: { [key: string]: any };
      build?: { [key: string]: any };
      server?: { [key: string]: any };
      base?: string;
    }
  
    export function defineConfig(config: UserConfig): UserConfig;
    export function loadEnv(mode: string, root: string, prefix?: string): { [key: string]: any };
  }
  
  declare module '@vitejs/plugin-react' {
    const _default: any;
    export default _default;
  }