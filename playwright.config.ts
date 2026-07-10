import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests/e2e",
  globalTeardown: "./tests/e2e/playwright.global-teardown.ts",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 1,
  reporter: [["html"], isCI ? ["github"] : ["list"]],
  timeout: 180000,
  expect: {
    timeout: 60000,
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    actionTimeout: 60000,
    navigationTimeout: 90000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  webServer: {
    command: isCI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCI,
    timeout: 120000,
  },
});
