import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

//const mode = process.env.NODE_ENV || 'development';

export default defineConfig(({ mode }) => {
  // Configuration values
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const backendUrl = isProduction ? env.VITE_API_URL : env.VITE_BACKEND_URL;

  return {
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
          target: backendUrl,
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
          assetFileNames: 'assets/[name]-[hash][extname]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const lib = id.toString().split('node_modules/')[1].split('/')[0];
              if (['react', 'react-dom', 'react-router'].includes(lib)) {
                return 'vendor-react';
              }
              if (lib.includes('chart') || lib.includes('vis')) {
                return 'vendor-charts';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    envDir: './'
  };
});


