import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
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
