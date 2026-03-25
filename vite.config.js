import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = dirname(fileURLToPath(import.meta.url));

const apiProxyTarget =
  process.env.API_PROXY_TARGET || 'http://localhost:3000';

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    port: 5173,
    fs: {
      allow: [projectRoot],
    },
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    css: true,
    restoreMocks: true,
  },
});
