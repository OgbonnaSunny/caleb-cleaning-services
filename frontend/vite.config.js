import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { icon: true }
    })
  ],
  resolve: {
    alias: {
      events: 'events',
    }
  },
  optimizeDeps: {
    include: ['events'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_SERVER_URL_DEV,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  envDir: './'
});


