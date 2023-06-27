/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, Plugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';
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

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_CDN || '',
    server: {
      port: 3003,
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
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
      VitePWA({
        registerType: 'autoUpdate',
        // add this to cache all the imports
        workbox: {
          globPatterns: ['**/*'],
          maximumFileSizeToCacheInBytes: 4000000,
          runtimeCaching: [
            {
              urlPattern: ({ url }) => {
                return ['assets.casperdash.io', 'github.com'].includes(
                  url.hostname
                );
              },
              handler: 'CacheFirst' as const,
              options: {
                cacheName: 'asset-cache',
                cacheableResponse: {
                  statuses: [0, 302, 200],
                },
              },
            },
          ],
        },
        // add this to cache all the
        // static assets in the public folder
        includeAssets: ['**/*'],
        manifest: {
          theme_color: '#FA2852',
          background_color: '#FA2852',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          name: 'CasperDash',
          short_name: 'CasperDash',
          description: 'Casper Dash Wallet',
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: '/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    define: {
      // By default, Vite doesn't include shims for NodeJS/
      // necessary for segment analytics lib to work
      // global: {},
    },
  });
};
