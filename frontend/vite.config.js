import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      events: 'events'  // Explicitly tell Vite where to find events
    }
  },
  optimizeDeps: {
    include: ['events']  // Force Vite to bundle it
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/frontend/',
});


