import { test, expect } from "@playwright/test";
import { signInUser, signUpUser } from "../helpers/auth-helpers";
import { cleanDatabase } from "../helpers/db-helpers";

test.describe("Authentication", () => {
  const user = {
    email: "user@test.com",
    password: "password1234",
  };

  test.beforeEach(async () => {
    await cleanDatabase();
  });
  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should signup new user", async ({ page }) => {
    const newUser = await signUpUser(page, user.email, user.password);
    await expect(
      page.locator("nav[data-testid='dashboard-nav']")
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='open-profile-menu']")
    ).toContainText(newUser.name, { timeout: 10000 });
  });

  test("should login existing user", async ({ page }) => {
    const newUser = await signUpUser(page, user.email, user.password);

    await page.click("button[data-testid='open-profile-menu']");
    await page.click("button[data-testid='signout-btn']");

    await signInUser(page, user.email, user.password);

    await expect(
      page.locator("nav[data-testid='dashboard-nav']")
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='open-profile-menu']")
    ).toContainText(newUser.name, { timeout: 10000 });
  });
});
