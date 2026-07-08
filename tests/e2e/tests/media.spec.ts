import {
  cleanWatchlistInDb,
  createTestMediaWithUser,
  MediaData,
} from "@/tests/shared-helpers/db-helpers";
import { expect, test } from "../fixtures/user.fixture";
import { signInUser } from "../helpers/auth-helpers";
import { getTMDBResultsWhenReady } from "../helpers/media-helpers";

test.describe("Watchlist managment", () => {
  test.beforeEach(async ({ user }) => {
    await cleanWatchlistInDb(user.id);
  });
  test(
    "should add custom film and display it into watchlist",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await signInUser(page, { email: user.email, password: user.password });
      const media = { title: "Film test", category: "Action" };

      await page.getByTestId("add-media-btn").click();
      await expect(page.getByTestId("add-media-modal")).toBeVisible();
      await expect(page.getByTestId("media-modal-nav")).toBeVisible();
      await page.getByTestId("create-media-nav").click();

      await page.getByTestId("media-title-input").fill(media.title);
      await page.getByTestId("media-category-input").fill(media.category);

      await page.getByTestId("submit-media-btn").click();

      await expect(page.getByTestId("add-media-modal")).not.toBeVisible();

      const mediaItem = page
        .getByTestId("media-item")
        .filter({ hasText: media.title });
      await expect(mediaItem).toBeVisible();

      await mediaItem.click();
      await expect(page.getByTestId("media-modal-content")).toBeVisible();
      await expect(page.getByTestId("dialog-title")).toContainText(media.title);
    },
  );

  test("shouldn't add custom film with empty title", async ({ page, user }) => {
    await signInUser(page, { email: user.email, password: user.password });
    const media = { title: "", category: "Action" };

    await page.getByTestId("add-media-btn").click();
    await expect(page.getByTestId("add-media-modal")).toBeVisible();
    await expect(page.getByTestId("media-modal-nav")).toBeVisible();
    await page.getByTestId("create-media-nav").click();

    await page.getByTestId("media-title-input").fill(media.title);
    await page.getByTestId("media-category-input").fill(media.category);

    await page.getByTestId("submit-media-btn").click();

    await expect(page.getByTestId("title-validation-error")).toBeVisible();
    await expect(page.getByTestId("add-media-modal")).toBeVisible();

    const mediaItem = page
      .getByTestId("media-item")
      .filter({ hasText: media.title });
    await expect(mediaItem).not.toBeVisible();
  });

  test(
    "should add TMDB film and display it into watchlist",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await signInUser(page, { email: user.email, password: user.password });
      const media = { title: "TMDB Media 1" };

      await page.getByTestId("add-media-btn").click();
      await expect(page.getByTestId("add-media-modal")).toBeVisible();

      await getTMDBResultsWhenReady(page, media.title);

      const mediaCard = page
        .getByTestId("search-media-card")
        .filter({ hasText: media.title });
      await expect(mediaCard).toBeVisible();
      await mediaCard.getByTestId("add-tmdb-btn").click();

      await expect(mediaCard).toContainText("Ajouté à la liste");

      await page.getByTestId("close-modal-btn").click();
      await expect(page.getByTestId("add-media-modal")).not.toBeVisible();

      const mediaItem = page
        .getByTestId("media-item")
        .filter({ hasText: media.title });
      await expect(mediaItem).toBeVisible();

      await mediaItem.click();
      await expect(page.getByTestId("media-modal-content")).toBeVisible();
      await expect(page.getByTestId("dialog-title")).toContainText(media.title);
    },
  );

  test("should filter and display media by category", async ({
    page,
    user,
  }) => {
    const media1: MediaData = { title: "Film 1", cat: "Cat1", type: "FILM" };
    const media2: MediaData = { title: "Serie 1", cat: "Cat2", type: "SERIE" };
    await createTestMediaWithUser(user.id, media1);
    await createTestMediaWithUser(user.id, media2);
    await signInUser(page, { email: user.email, password: user.password });

    await page.getByTestId("categories-nav").click();

    await page.selectOption("select#category-filter", {
      value: media1.cat,
    });

    const mediaItem1 = page
      .getByTestId("media-item")
      .filter({ hasText: media1.title });
    await expect(mediaItem1).toBeVisible();
    const mediaItem2 = page
      .getByTestId("media-item")
      .filter({ hasText: media2.title });
    await expect(mediaItem2).not.toBeVisible();
  });

  test(
    "should delete media from watchlist",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      const { media } = await createTestMediaWithUser(user.id);
      await signInUser(page, { email: user.email, password: user.password });

      const mediaRow = page
        .getByTestId("media-row")
        .filter({ hasText: media.title });
      await expect(mediaRow).toBeVisible();

      await mediaRow.getByTestId("delete-item-btn").click();
      await expect(mediaRow).not.toBeVisible();
    },
  );
});
