import test, { expect } from "@playwright/test";
import { cleanDatabase } from "../helpers/db-helpers";
import { signInUser, signUpUser } from "../helpers/auth-helpers";
import { createTestCategory, createTestMedia } from "../helpers/media-helpers";
import { prisma } from "@/src/lib/server";

test.describe("Media - dashboard page", () => {
  let userId: string;
  const user = { email: "dashboard@test.com", password: "dashboard1234" };

  test.beforeEach(async ({ page }) => {
    await cleanDatabase();
    const userData = await signUpUser(page, user.email, user.password);
    userId = userData.id;
  });

  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should add custom film and display watchlist", async ({ page }) => {
    await signInUser(page, user.email, user.password);
    await createTestCategory();

    await page.click("button[data-testid='add-media-btn']");
    await page.click("button[data-testid='create-media-nav']");
    await page.fill("input[id='title']", "Film test");
    await page.selectOption(
      "select#category",
      { value: "Action" },
      { timeout: 5000 }
    );

    await page.click("button[type='submit']");

    await expect(page.locator("text=Film test")).toBeVisible();
    await page.goto("/dashboard");
    await expect(page.locator("text=Film test")).toBeVisible();
  });

  test("should add TMDB film and display watchlist", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    await page.click("button[data-testid='add-media-btn']");
    await page.fill("input[id='media-search']", "Midsommar");
    await page.click("button[data-testid='search-media-btn']");

    const firstCard = page.locator("div.search-media-card").first();
    await expect(firstCard).toBeVisible();

    await firstCard.locator("button[data-testid='add-tmdb-btn']").click();
    await expect(firstCard).toContainText("Ajouté à la liste");

    await page.locator('span.sr-only:has-text("Close")').locator("..").click();
    await expect(page.locator('[role="dialog"]')).toBeHidden();

    await expect(page.locator("text=Midsommar")).toBeVisible();
    await page.goto("/dashboard");
    await expect(page.locator("text=Midsommar")).toBeVisible();
  });

  test("should add custom serie and display watchlist", async ({ page }) => {
    await signInUser(page, user.email, user.password);
    await createTestCategory();

    await page.click("button[data-testid='series-nav']");

    await page.click("button[data-testid='add-media-btn']");
    await page.click("button[data-testid='create-media-nav']");

    await page.fill("input[id='title']", "Serie test");
    await page.selectOption(
      "select#category",
      { value: "Action" },
      { timeout: 5000 }
    );
    await page.click("button[type='submit']");

    await expect(page.locator("text=Serie test")).toBeVisible();
    await page.goto("/dashboard");
    await page.click("button[data-testid='series-nav']");
    await expect(page.locator("text=Serie test")).toBeVisible();
  });

  test("should filter and display media by category", async ({ page }) => {
    await signInUser(page, user.email, user.password);
    const newMedia = await createTestMedia();
    const { media } = await prisma.usersWatchList.create({
      data: {
        userId: userId,
        mediaId: newMedia.id,
      },
      select: {
        media: true,
      },
    });

    await page.click("button[data-testid='categories-nav']");

    await page.selectOption(
      "select#category-filter",
      { value: media.categories[0] },
      { timeout: 5000 }
    );

    await expect(page.locator(`text=${media.title}`)).toBeVisible();
  });
});
