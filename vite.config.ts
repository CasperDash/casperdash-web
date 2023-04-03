/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve as pathResolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig, Plugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const resolve = (path: string) => pathResolve(__dirname, path);

// remove shebeng from code (most often #!/usr/bin/env node)
// vite recognizes the shebang as a comment and needs to be removed because it causes a parse error.
export const removeShebangPlugin = (): Plugin => {
  return {
    name: 'vitest:remove-shebang-plugin',
    enforce: 'pre',
    transform(code) {
      // eslint-disable-next-line no-useless-escape
      return code.replace(/^\#\!.*/, '');
    },
  };
};

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    removeShebangPlugin(),
    viteTsConfigPaths({
      root: './',
    }),
    react(),
    svgr(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
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
    // global: {},
  },
});
