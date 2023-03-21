/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve as pathResolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const resolve = (path: string) => pathResolve(__dirname, path);

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': resolve('src'),
      '~': resolve('public'),
    },
  },
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});
