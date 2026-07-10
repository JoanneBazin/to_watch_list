import { expect, test } from "../fixtures/user.fixture";
import { signInUser } from "../helpers/auth-helpers";
import { clickWhenStable, goToWatchlist } from "../helpers/dom-helpers";
import {
  cleanSuggestionsInDb,
  createFriendRequest,
  createTestMediaSuggestion,
  createTestMediaWithUser,
  createUserInDb,
} from "@/tests/shared-helpers/db-helpers";
import { getTMDBResultsWhenReady } from "../helpers/media-helpers";

test.describe("Suggestions managment", () => {
  let contact: Awaited<ReturnType<typeof createUserInDb>>;

  test.beforeAll(async ({ user }) => {
    contact = await createUserInDb();
    await createFriendRequest(user.id, contact.id, "ACCEPTED");
  });

  test.beforeEach(async ({ user }) => {
    await cleanSuggestionsInDb(user.id);
  });

  test.describe("Suggestion reception", () => {
    for (const type of ["FILM", "SERIE"] as const) {
      test(
        `should display received ${type} suggestion and add it into watchlist`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          const senderComment = "Media sender comment";
          const suggestion = await createTestMediaSuggestion(
            contact.id,
            user.id,
            { type, senderComment },
          );
          await signInUser(page, {
            email: user.email,
            password: user.password,
          });

          await page.getByTestId("suggestions-nav").click();

          const suggestionCard = page.getByTestId("suggestion-card").filter({
            hasText: suggestion.media.title,
          });
          await expect(suggestionCard).toBeVisible();
          await expect(suggestionCard).toContainText(suggestion.media.title);
          await expect(suggestionCard).toContainText(contact.name);
          await expect(suggestionCard).toContainText(senderComment);

          await suggestionCard.getByTestId("accept-suggestion-btn").click();
          await expect(
            suggestionCard.getByTestId("added-suggestion"),
          ).toBeVisible();

          await goToWatchlist(page, type);
          await expect(
            page
              .getByTestId("media-item")
              .filter({ hasText: suggestion.media.title }),
          ).toBeVisible();
        },
      );

      test(
        `should display received ${type} suggestion and ignore it`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          const suggestion = await createTestMediaSuggestion(
            contact.id,
            user.id,
            { type },
          );
          await signInUser(page, {
            email: user.email,
            password: user.password,
          });

          await page.getByTestId("suggestions-nav").click();

          const suggestionCard = page.getByTestId("suggestion-card").filter({
            hasText: suggestion.media.title,
          });
          await expect(suggestionCard).toBeVisible();

          await suggestionCard.getByTestId("delete-suggestion-btn").click();
          await expect(
            suggestionCard.getByTestId("deleted-suggestion"),
          ).toBeVisible();

          await goToWatchlist(page, type);
          await expect(
            page
              .getByTestId("media-item")
              .filter({ hasText: suggestion.media.title }),
          ).not.toBeVisible();
        },
      );
    }
  });

  test.describe("Sending suggestions", () => {
    for (const type of ["FILM", "SERIE"] as const) {
      test(
        `should send ${type} suggestion from watchlist`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          const { media } = await createTestMediaWithUser(user.id, { type });
          await signInUser(page, {
            email: user.email,
            password: user.password,
          });
          await goToWatchlist(page, type);

          const mediaRow = page
            .getByTestId("media-row")
            .filter({ hasText: media.title });
          await expect(mediaRow).toBeVisible();
          await mediaRow.getByTestId("share-btn").click();

          const contactRow = page
            .getByTestId("share-contact-item")
            .filter({ hasText: contact.name });
          const sendBtn = page.getByTestId("submit-media-btn");

          await clickWhenStable(contactRow);
          await clickWhenStable(sendBtn);

          await expect(page.getByTestId("sent-msg")).toBeVisible();
        },
      );

      test(
        `should create TMDB ${type} suggestion`,
        { tag: ["@regression"] },
        async ({ page, user }) => {
          await signInUser(page, {
            email: user.email,
            password: user.password,
          });
          const newMedia = { title: "TMDB Media 1" };

          await page.goto(`/user/${contact.id}`);
          const sendSuggestionBtn = page.getByTestId(
            `create-${type}-suggestion`,
          );

          await expect(sendSuggestionBtn).toBeVisible();
          await sendSuggestionBtn.click();
          await expect(page.getByTestId("send-media-modal")).toBeVisible();

          await getTMDBResultsWhenReady(page, newMedia.title);

          const firstCard = page.getByTestId("search-media-card").first();
          await expect(firstCard).toBeVisible();
          await firstCard.getByTestId("submit-media-btn").click();

          await expect(firstCard.getByTestId("media-added")).toBeVisible();
        },
      );

      test(`should create custom ${type} suggestion`, async ({
        page,
        user,
      }) => {
        await signInUser(page, {
          email: user.email,
          password: user.password,
        });

        const newMedia = { title: "Suggestion test", category: "Cat" };

        await page.goto(`/user/${contact.id}`);
        const sendSuggestionBtn = page.getByTestId(`create-${type}-suggestion`);

        await expect(sendSuggestionBtn).toBeVisible();
        await sendSuggestionBtn.click();
        await expect(page.getByTestId("send-media-modal")).toBeVisible();
        await expect(page.getByTestId("media-modal-nav")).toBeVisible();
        await page.getByTestId("create-media-nav").click();

        await page.getByTestId("media-title-input").fill(newMedia.title);
        await page.getByTestId("media-category-input").fill(newMedia.category);

        await page.getByTestId("submit-media-btn").click();
        await expect(page.getByTestId("add-media-modal")).not.toBeVisible();
      });
    }

    test(
      "should display received messages",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        const receiverComment = "Media receiver comment";
        const suggestion = await createTestMediaSuggestion(
          user.id,
          contact.id,
          {
            receiverComment,
          },
        );
        await signInUser(page, {
          email: user.email,
          password: user.password,
        });

        await page.getByTestId("suggestions-nav").click();
        await expect(page.getByTestId("suggestions-navbar")).toBeVisible();
        await page.getByTestId("messages-nav").click();

        const messageCard = page.getByTestId("message-card").filter({
          hasText: suggestion.media.title,
        });

        await expect(messageCard).toBeVisible();
        await messageCard.click();

        await expect(messageCard).toContainText(receiverComment);
      },
    );
  });
});
