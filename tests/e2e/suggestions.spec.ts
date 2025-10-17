import test, { expect } from "@playwright/test";
import { cleanDatabase, createTestContact } from "../helpers/setup";
import { signInUser, signUpUser } from "../helpers/auth-helpers";
import {
  createTestCategory,
  createTestSuggestion,
} from "../helpers/media-helpers";

test.describe("Suggestions page", () => {
  let userId: string;
  let contactId: string;
  const user = { email: "suggestions@test.com", password: "suggestions1234" };

  test.beforeEach(async ({ page }) => {
    await cleanDatabase();
    const userData = await signUpUser(page, user.email, user.password);
    userId = userData.id;
    const { receiver } = await createTestContact(userId, {
      email: "contact@test.com",
    });
    contactId = receiver.id;
    await createTestCategory({ name: "Adventure" });
  });

  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should display received suggestions", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    const receivedSuggestion = await createTestSuggestion(contactId, userId, {
      title: "Nice movie",
      synopsis: null,
      year: null,
      real: null,
      platform: null,
      type: "FILM",
      categoryName: "Adventure",
    });
    await page.goto("/suggestions");
    await page.waitForSelector("[data-testid='suggestion-card']");

    const suggestionCard = page.locator("[data-testid='suggestion-card']", {
      hasText: receivedSuggestion.media.title,
    });
    await expect(suggestionCard).toBeVisible();
    await expect(suggestionCard).toContainText(receivedSuggestion.sender.name);
    if (receivedSuggestion.senderComment) {
      await expect(suggestionCard).toContainText(
        receivedSuggestion.senderComment
      );
    }

    await page.click("button[data-testid='accept-suggestion-btn']");
    await expect(page.locator("text=Suggestion ajoutée")).toBeVisible();
  });

  test("should display received messages", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    const sentSuggestion = await createTestSuggestion(
      userId,
      contactId,
      {
        title: "Nice show",
        synopsis: null,
        year: null,
        real: null,
        platform: null,
        type: "SERIE",
        categoryName: "Adventure",
      },
      "This was a great idea"
    );

    await page.goto("/suggestions");
    await page.click("button[data-testid='messages-nav']");

    const messageCard = page.locator("[data-testid='message-card']", {
      hasText: sentSuggestion.media.title,
    });

    await expect(messageCard).toBeVisible();
    await messageCard.click();

    if (sentSuggestion.receiverComment) {
      await expect(messageCard).toContainText(sentSuggestion.receiverComment);
    }
  });
});
