import {
  cleanFriendRequestsInDb,
  createFriendRequest,
  createUserInDb,
} from "@/tests/shared-helpers/db-helpers";
import { expect, test } from "../fixtures/user.fixture";
import { signInUser } from "../helpers/auth-helpers";

test.describe("Social managment", () => {
  let contact: Awaited<ReturnType<typeof createUserInDb>>;

  test.beforeAll(async () => {
    contact = await createUserInDb();
  });

  test.beforeEach(async ({ user }) => {
    await cleanFriendRequestsInDb(user.id);
  });

  test(
    "should display user contacts",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await createFriendRequest(user.id, contact.id, "ACCEPTED");

      await signInUser(page, { email: user.email, password: user.password });

      await page.getByTestId("communauty-nav").click();

      const contactCard = page.getByTestId("contact-card").filter({
        hasText: contact.name,
      });

      await expect(contactCard).toBeVisible();
      await contactCard.locator("a").click();
      await page.waitForURL(`/user/${contact.id}`);

      await page.waitForSelector("[data-testid='contact-profile']");

      await expect(page.getByTestId("profile-name-title")).toContainText(
        contact.name,
      );
    },
  );

  test(
    "should display pending friend request received and accept it",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await createFriendRequest(user.id, contact.id, "PENDING");

      await signInUser(page, { email: user.email, password: user.password });

      await page.getByTestId("communauty-nav").click();
      await expect(page.getByTestId("communauty-navbar")).toBeVisible();

      await page.getByTestId("requests-nav").click();
      await page.waitForLoadState("networkidle");

      const requestCard = page.getByTestId("request-card").filter({
        hasText: contact.name,
      });
      await expect(requestCard).toBeVisible();

      await requestCard.getByTestId("accept-request-btn").click();
      await expect(requestCard.getByTestId("view-profile-btn")).toBeVisible();

      await page.getByTestId("contacts-nav").click();
      const contactCard = page.getByTestId("contact-card").filter({
        hasText: contact.name,
      });

      await expect(contactCard).toBeVisible();
    },
  );

  test(
    "should display pending friend request received and delete it",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await createFriendRequest(user.id, contact.id, "PENDING");

      await signInUser(page, { email: user.email, password: user.password });

      await page.getByTestId("communauty-nav").click();
      await expect(page.getByTestId("communauty-navbar")).toBeVisible();

      await page.getByTestId("requests-nav").click();
      await page.waitForLoadState("networkidle");

      const requestCard = page.getByTestId("request-card").filter({
        hasText: contact.name,
      });
      await expect(requestCard).toBeVisible();

      await requestCard.getByTestId("delete-request-btn").click();
      await expect(
        requestCard.getByTestId("accept-request-btn"),
      ).not.toBeVisible();

      await page.getByTestId("contacts-nav").click();
      const contactCard = page.getByTestId("contact-card").filter({
        hasText: contact.name,
      });

      await expect(contactCard).not.toBeVisible();
    },
  );

  test(
    "should search and display users by name and send a friend request",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      await signInUser(page, { email: user.email, password: user.password });

      await page.getByTestId("communauty-nav").click();
      await expect(page.getByTestId("communauty-navbar")).toBeVisible();

      await page.getByTestId("search-nav").click();
      const searchInput = page.getByTestId("search-user-input");
      await expect(searchInput).toBeVisible();
      await searchInput.fill(contact.name);

      const contactCard = page
        .getByTestId("user-card")
        .filter({ hasText: contact.name });
      await expect(contactCard).toBeVisible({ timeout: 10000 });

      const addBtn = contactCard.getByTestId("add-contact-btn");
      await expect(addBtn).toBeVisible();
      await addBtn.click();

      await expect(contactCard.getByTestId("pending-request")).toBeVisible();
    },
  );
});
