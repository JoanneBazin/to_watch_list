import test, { expect } from "@playwright/test";
import { cleanDatabase } from "../helpers/db-helpers";
import { createTestUser, signInUser } from "../helpers/auth-helpers";
import {
  createTestCategory,
  createTestMediaSuggestion,
  createTestMediaWithUser,
} from "../helpers/media-helpers";
import { createContactWithFriendRequest } from "../helpers/social-helpers";
import {
  clickWhenStable,
  getTMDBResultsWhenReady,
  selectWhenStable,
} from "../helpers/dom-helpers";

test.describe("Suggestions actions", () => {
  let userId: string;
  let contact: { id: string; name: string };
  const user = { email: "suggestions@test.com", password: "suggestions1234" };

  test.beforeAll(async () => {
    await cleanDatabase();
    userId = await createTestUser(user);
  });

  test.beforeEach(async ({ page }) => {
    await page.waitForTimeout(500);
    await cleanDatabase(userId);
    await signInUser(page, user.email, user.password);
    const { sender } = await createContactWithFriendRequest(userId, "ACCEPTED");
    contact = { id: sender.id, name: sender.name };
  });

  test("should display received suggestions", async ({ page }) => {
    const suggestion = await createTestMediaSuggestion(contact.id, userId);
    await page.goto("/suggestions");
    await page.waitForSelector("[data-testid='suggestion-card']");

    const suggestionCard = page.locator("[data-testid='suggestion-card']", {
      hasText: suggestion.media.title,
    });
    await expect(suggestionCard).toBeVisible();
    await expect(suggestionCard).toContainText(suggestion.sender.name);
    if (suggestion.senderComment) {
      await expect(suggestionCard).toContainText(suggestion.senderComment);
    }

    await suggestionCard
      .locator("button[data-testid='accept-suggestion-btn']")
      .click();
    await expect(
      suggestionCard.locator("text=Suggestion ajoutée")
    ).toBeVisible();

    await page.goto("/dashboard");
    await expect(
      page
        .locator("[data-testid='media-item']")
        .filter({ hasText: suggestion.media.title })
    ).toBeVisible();
  });

  test("should display received messages", async ({ page }) => {
    const suggestion = await createTestMediaSuggestion(
      userId,
      contact.id,
      "This was a great idea"
    );

    await page.goto("/suggestions");
    await page.click("button[data-testid='messages-nav']");
    await page.waitForSelector("[data-testid='message-card']");

    const messageCard = page.locator("[data-testid='message-card']", {
      hasText: suggestion.media.title,
    });

    await expect(messageCard).toBeVisible();
    await messageCard.click();

    if (suggestion.receiverComment) {
      await expect(messageCard).toContainText(suggestion.receiverComment);
    }
  });

  test("should send suggestion from watchlist", async ({ page }) => {
    const { media } = await createTestMediaWithUser(userId);
    await page.reload();

    const mediaRow = page
      .locator("[data-testid='media-row']")
      .filter({ hasText: media.title });
    await mediaRow.waitFor({ state: "visible", timeout: 60000 });
    await mediaRow.locator("[data-testid='share-btn']").click();

    const contactRow = page
      .locator("[data-testid='share-contact-item']")
      .filter({ hasText: contact.name });
    const sendBtn = page.locator("[data-testid='send-btn']");

    await clickWhenStable(contactRow);
    await clickWhenStable(sendBtn);

    await expect(page.locator("[data-testid='sent-msg']")).toBeVisible();
  });

  test("should create TMDB suggestion", async ({ page }) => {
    const newMedia = { title: "TMDB Media 1" };

    await page.goto(`/user/${contact.id}`);
    await page.waitForLoadState("networkidle");

    await page.click("button[data-testid='create-SERIE-suggestion']");

    await getTMDBResultsWhenReady(page, newMedia.title);

    const firstCard = page.locator(".search-media-card").first();

    await firstCard.locator("button[data-testid='send-btn']").click(),
      await expect(firstCard).toContainText("Suggestion envoyée");
  });

  test("should create custom suggestion", async ({ page }) => {
    const cat = "Action";

    await page.route("/api/category", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([{ id: "1", name: cat }]),
      });
    });

    const newMedia = { title: "Suggestion test", category: cat };

    await page.goto(`/user/${contact.id}`);
    await page.waitForLoadState("networkidle");

    await page.click("button[data-testid='create-FILM-suggestion']");
    await page.click("button[data-testid='create-media-nav']");

    await page.fill("input[id='title']", newMedia.title);
    await selectWhenStable(page, "select#category", newMedia.category);
    await page.click("button[data-testid='send-btn']");

    await expect(page.locator('[role="dialog"]')).toBeHidden();
  });
});
