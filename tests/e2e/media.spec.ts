import test, { expect } from "@playwright/test";
import { cleanDatabase } from "../helpers/setup";
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
    await createTestCategory();
  });

  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should add and display user film watchlist", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    await page.click("button[data-testid='add-film-btn']");
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

  test("should add and display user serie watchlist", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    await page.click("button[data-testid='series-nav']");

    await page.click("button[data-testid='add-serie-btn']");
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
      { value: media.categoryName },
      { timeout: 5000 }
    );

    await expect(page.locator(`text=${media.title}`)).toBeVisible();
  });
});
