import test, { expect } from "@playwright/test";
import { cleanDatabase } from "../helpers/db-helpers";
import { signUpUser } from "../helpers/auth-helpers";
import {
  createTestCategory,
  createTestMediaWithUser,
} from "../helpers/media-helpers";
import { selectWhenStable } from "../helpers/dom-helpers";

test.describe("Media - dashboard page", () => {
  let userId: string;
  const user = { email: "dashboard@test.com", password: "dashboard1234" };

  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(500);
    await cleanDatabase();
    const userData = await signUpUser(page, user.email, user.password);
    userId = userData.id;
  });

  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should add custom film and display watchlist", async ({ page }) => {
    const cat = await createTestCategory();
    const newMedia = { title: "Film test", category: cat.name };

    await page.click("button[data-testid='add-media-btn']");
    await page.click("button[data-testid='create-media-nav']");

    await page.fill("input[id='title']", newMedia.title);

    await selectWhenStable(page, "select#category", newMedia.category);

    await page.click("button[type='submit']");

    await expect(page.locator('[role="dialog"]')).toBeHidden();

    const mediaItem = page
      .locator("[data-testid='media-item']")
      .filter({ hasText: newMedia.title });
    await expect(mediaItem).toBeVisible();

    await page.waitForLoadState("domcontentloaded");
    await page.goto("/dashboard");

    await expect(mediaItem).toBeVisible();
  });

  test("should add TMDB film and display watchlist", async ({ page }) => {
    const newMedia = { title: "Midsommar" };

    await page.click("button[data-testid='add-media-btn']");

    await page.fill("input[id='media-search']", newMedia.title);
    await page.click("button[data-testid='search-media-btn']");

    const firstCard = page.locator(".search-media-card").first();
    await firstCard.waitFor({ state: "attached", timeout: 60000 });

    await firstCard.locator("button[data-testid='add-tmdb-btn']").click(),
      await expect(firstCard).toContainText("Ajouté à la liste");

    await page.click('[data-testid="close-modal-btn"]');
    await expect(page.locator('[role="dialog"]')).toBeHidden();

    const mediaItem = page
      .locator("[data-testid='media-item']")
      .filter({ hasText: newMedia.title });
    await expect(mediaItem).toBeVisible();

    await page.waitForLoadState("domcontentloaded");
    await page.goto("/dashboard");

    await expect(mediaItem).toBeVisible();
  });

  test("should add custom serie and display watchlist", async ({ page }) => {
    const cat = await createTestCategory();
    const newMedia = { title: "Film test", category: cat.name };

    await page.click("button[data-testid='series-nav']");

    await page.click("button[data-testid='add-media-btn']");
    await page.click("button[data-testid='create-media-nav']");

    await page.fill("input[id='title']", newMedia.title);
    await selectWhenStable(page, "select#category", newMedia.category);
    await page.click("button[type='submit']");

    await expect(page.locator('[role="dialog"]')).toBeHidden();

    const mediaItem = page
      .locator("[data-testid='media-item']")
      .filter({ hasText: newMedia.title });
    await expect(mediaItem).toBeVisible();

    await page.waitForLoadState("domcontentloaded");
    await page.goto("/dashboard");
    await page.click("button[data-testid='series-nav']");

    await expect(mediaItem).toBeVisible();
  });

  test("should filter and display media by category", async ({ page }) => {
    const { media } = await createTestMediaWithUser(userId);

    await page.click("button[data-testid='categories-nav']");

    await page.selectOption("select#category-filter", {
      value: media.categories[0],
    });

    const mediaItem = page
      .locator("[data-testid='media-item']")
      .filter({ hasText: media.title });
    await expect(mediaItem).toBeVisible();
  });

  test("should delete media from watchlist", async ({ page }) => {
    const { media } = await createTestMediaWithUser(userId);

    const mediaRow = page
      .locator("[data-testid='media-row']")
      .filter({ hasText: media.title });
    await expect(mediaRow).toBeVisible();
    await mediaRow.locator("[data-testid='delete-item-btn']").click();
    await expect(mediaRow).not.toBeVisible();
  });
});
