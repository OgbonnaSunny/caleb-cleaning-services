import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(),
    svgr({
      include: '**/*.svg?react', // Only transform SVG files with ?react suffix
      svgrOptions: {
        icon: true, // Optional: enables SVG props like width/height
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});


