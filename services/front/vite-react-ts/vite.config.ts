import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    base: "/",
    define: {
      __APP_ENV__: JSON.stringify(env.__APP_ENV__),
    },
    server: {
      watch: {
        usePolling: true,
      },
      port: parseInt(env.VITE_PORT_FRONTEND || '3000', 10),
      strictPort: true,
      host: '0.0.0.0',
    },
    future: {
      v7_startTransition: true,
    },
  }
})
