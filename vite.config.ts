/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig, Plugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    port: 3003,
  },
  plugins: [
    removeShebangPlugin(),
    react(),
    svgr(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    tsconfigPaths(),
  ],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    // global: {},
  },
});
