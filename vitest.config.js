import { defineConfig } from "vitest/config";

export default defineConfig({
  globals: true,
  globalSetup: [
    './lib/test_setup.js',
  ],
  resolve: {
    alias: {
      '@': __dirname
    },
  },
});