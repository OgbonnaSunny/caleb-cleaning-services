import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

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
      // Add other aliases if needed
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
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist/frontend',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        // Use consistent hashing for files
        assetFileNames: 'assets/[name]-[hash].[ext]',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  base: '/frontend/',
  envDir: './'
});


