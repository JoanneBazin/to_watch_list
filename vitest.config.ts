import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [],
  test: {
    setupFiles: ["./tests/setupTests.ts"],
    environment: "node",
    env: {
      NODE_ENV: "test",
    },
    globals: true,
    fileParallelism: false,
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
