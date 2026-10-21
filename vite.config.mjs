import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // plotly.js source deps (has-hover) read Node's `global`; the prebuilt dist
  // shimmed it, the slim source build needs the browser equivalent.
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: [
      // plotly.js/src/registry.js requires maplibre's ~80 kB stylesheet for
      // tile-map traces; the slim Plot build only registers bar + choropleth.
      {
        find: /^maplibre-gl\/dist\/maplibre-gl\.css$/,
        replacement: fileURLToPath(new URL('./src/styles/empty.css', import.meta.url)),
      },
    ],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Keep CRA's output directory so the existing S3 deploy workflow is unchanged.
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
