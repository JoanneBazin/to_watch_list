import test, { expect } from "@playwright/test";
import {
  cleanDatabase,
  createTestContact,
  createTestUser,
} from "../helpers/setup";
import { signInUser, signUpUser } from "../helpers/auth-helpers";
import { prisma } from "@/src/lib/server";

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
    const { receiver: contact } = await createTestContact(userId, {
      email: "contact@test.com",
    });
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

    const senderId = await createTestUser({
      email: "senderUser@test.com",
      name: " Test Sender",
      password: "sender1234",
    });

    const requestReceived = await prisma.friendRequest.create({
      data: {
        senderId,
        receiverId: userId,
      },
      select: { sender: true },
    });

    await page.goto("/communauty");
    await page.click("button[data-testid='requests-nav']");

    const requestCard = page.locator("[data-testid='request-card']", {
      hasText: requestReceived.sender.name,
    });

    await expect(requestCard).toBeVisible();
  });

  test("should display users by name", async ({ page }) => {
    await signInUser(page, user.email, user.password);

    const { receiver: contact1 } = await createTestContact(userId, {
      email: "firstContact@test.com",
      name: "First Contact",
    });
    const { receiver: contact2 } = await createTestContact(userId, {
      email: "secondContact@test.com",
      name: "Second Contact",
    });

    await page.goto("/communauty");
    await page.click("button[data-testid='search-nav']");

    await page.waitForSelector("input[data-testid='search-user-input']");
    await page.fill("input[data-testid='search-user-input']", contact1.name);

    await expect(page.locator("[data-testid='user-card']")).toBeVisible({
      timeout: 5000,
    });

    const contact1Card = page.locator("[data-testid='user-card']", {
      hasText: contact1.name,
    });
    await expect(contact1Card).toBeVisible();
    await expect(contact1Card).toContainText("Voir le profil");

    const contact2Card = page.locator("[data-testid='user-card']", {
      hasText: contact2.name,
    });
    await expect(contact2Card).not.toBeVisible();
  });
});
