import test, { expect } from "@playwright/test";
import { cleanDatabase } from "../helpers/db-helpers";
import { signInUser, signUpUser } from "../helpers/auth-helpers";
import { createTestMediaSuggestion } from "../helpers/media-helpers";
import { createContactWithFriendRequest } from "../helpers/social-helpers";

test.describe("Suggestions page", () => {
  let userId: string;
  let contactId: string;
  const user = { email: "suggestions@test.com", password: "suggestions1234" };

  test.beforeEach(async ({ page }) => {
    await cleanDatabase();
    const userData = await signUpUser(page, user.email, user.password);
    userId = userData.id;
    const { sender } = await createContactWithFriendRequest(userId, "ACCEPTED");
    contactId = sender.id;
  });

  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should display received suggestions", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    const suggestion = await createTestMediaSuggestion(contactId, userId);
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
  });

  test("should display received messages", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    const suggestion = await createTestMediaSuggestion(
      userId,
      contactId,
      "This was a great idea"
    );

    await page.goto("/suggestions");
    await page.click("button[data-testid='messages-nav']");

    const messageCard = page.locator("[data-testid='message-card']", {
      hasText: suggestion.media.title,
    });

    await expect(messageCard).toBeVisible();
    await messageCard.click();

    if (suggestion.receiverComment) {
      await expect(messageCard).toContainText(suggestion.receiverComment);
    }
  });
});
