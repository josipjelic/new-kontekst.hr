import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const srcRoot = resolve(projectRoot, 'src');

const apiProxyTarget =
  process.env.API_PROXY_TARGET || 'http://localhost:3000';

export default defineConfig({
  root: srcRoot,
  publicDir: resolve(projectRoot, 'public'),
  plugins: [react()],
  base: '/',
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
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
    root: projectRoot,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    css: true,
    restoreMocks: true,
  },
});
