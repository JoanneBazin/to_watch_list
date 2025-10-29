import test, { expect } from "@playwright/test";
import { cleanDatabase } from "../helpers/db-helpers";
import { signInUser, signUpUser } from "../helpers/auth-helpers";
import {
  createContactWithFriendRequest,
  createUserIntoDb,
} from "../helpers/social-helpers";

test.describe("Social - communauty page", () => {
  let userId: string;
  const user = { email: "communauty@test.com", password: "communauty1234" };

  test.beforeEach(async ({ page }) => {
    await cleanDatabase();
    const userData = await signUpUser(page, user.email, user.password);
    userId = userData.id;
  });

  test.afterAll(async () => {
    await cleanDatabase();
  });

  test("should display user contacts", async ({ page }) => {
    await signInUser(page, user.email, user.password);
    const { sender: contact } = await createContactWithFriendRequest(
      userId,
      "ACCEPTED"
    );
    await page.goto("/communauty");

    const contactCard = page.locator("[data-testid='contact-card']", {
      hasText: contact.name,
    });

    await expect(contactCard).toBeVisible();
    await contactCard.locator("a").click();
    await page.waitForURL(`/user/${contact.id}`);

    await page.waitForSelector("[data-testid='contact-profile']");

    await expect(page.locator("h2")).toContainText(contact.name);
  });

  test("should display pending friend requests received", async ({ page }) => {
    await signInUser(page, user.email, user.password);
    const { sender } = await createContactWithFriendRequest(userId, "PENDING");

    await page.goto("/communauty");
    await page.click("button[data-testid='requests-nav']");

    const requestCard = page.locator("[data-testid='request-card']", {
      hasText: sender.name,
    });

    await expect(requestCard).toBeVisible();
  });

  test("should display users by name", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    const { sender: friend } = await createContactWithFriendRequest(
      userId,
      "ACCEPTED"
    );
    await createUserIntoDb({
      email: "lambda_user@test.com",
      name: "Lambda User",
    });

    await page.goto("/communauty");
    await page.click("button[data-testid='search-nav']");

    await page.waitForSelector("input[data-testid='search-user-input']");
    await page.fill("input[data-testid='search-user-input']", friend.name);

    const cards = page.locator("[data-testid='user-card']");
    await expect(cards).toBeVisible({
      timeout: 5000,
    });
    expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText(friend.name);
    await expect(cards.first()).toContainText("Voir le profil");
  });
});
