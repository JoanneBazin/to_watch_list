import { test, expect } from "@playwright/test";
import { signUpUser } from "../helpers/auth-helpers";
import { cleanDatabase } from "../helpers/db-helpers";

test.describe("Authentication", () => {
  test.beforeEach(async () => {
    await cleanDatabase();
  });
  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should signup new user", async ({ page }) => {
    await page.goto("/auth");
    const toggleForm = page.locator("[data-testid='toggle-auth-form']");

    await expect(toggleForm).toBeVisible();
    await expect(toggleForm).toContainText("Créer un compte");
    await page.click("button[data-testid='toggle-auth-form']");

    await page.fill("input[data-testid='name-input']", "Example User");
    await page.fill("input[data-testid='email-input']", "user@example.com");
    await page.fill("input[data-testid='password-input']", "password1234");
    await page.click("button[data-testid='auth-submit']");

    await page.waitForURL("/dashboard");
    await expect(
      page.locator("nav[data-testid='dashboard-nav']")
    ).toBeVisible();
  });

  test("should login existing user", async ({ page }) => {
    const user = { email: "login@test.com", password: "login1234" };
    await signUpUser(page, user.email, user.password);

    await page.click("button[data-testid='open-profile-menu']");
    await page.click("button[data-testid='signout-btn']");

    await page.goto("/auth");

    await page.fill("input[data-testid='email-input']", user.email);
    await page.fill("input[data-testid='password-input']", user.password);
    await page.click("button[data-testid='auth-submit']");

    await page.waitForURL("/dashboard");
    await expect(
      page.locator("nav[data-testid='dashboard-nav']")
    ).toBeVisible();
  });
});
