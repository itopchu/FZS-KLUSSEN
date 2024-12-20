import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    define: {
      // Expose variables as `import.meta.env`
      'import.meta.env': {
        env,
      },
    },
    build: {
      outDir: 'dist',
    },
    server: {
      watch: {
        usePolling: true,
      },
      port: parseInt(env.VITE_PORT_FRONTEND || '3000', 10),
      strictPort: true,
      host: '0.0.0.0',
    },
  });
};