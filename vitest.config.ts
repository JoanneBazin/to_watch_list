import { defineConfig } from "vitest/config";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./tests/integration/vitest.setup.ts"],
    globalSetup: ["./tests/integration/vitest.global-setup.ts"],
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
