import { auth, prisma } from "@/src/lib/server";
import { Page } from "@playwright/test";

export const signUpUser = async (
  page: Page,
  email: string,
  password: string
) => {
  await page.goto("/auth");
  await page.click("button[data-testid='toggle-auth-form']");

  await page.fill("input[data-testid='name-input']", "Test User");
  await page.fill("input[data-testid='email-input']", email);
  await page.fill("input[data-testid='password-input']", password);
  await page.click("button[data-testid='auth-submit']");

  await page.waitForURL("/dashboard");

  const user = await prisma.user.findUnique({ where: { email } });
  return user!!;
};

export const signInUser = async (
  page: Page,
  email: string,
  password: string
) => {
  await page.goto("/auth");

  await page.fill("input[data-testid='email-input']", email);
  await page.fill("input[data-testid='password-input']", password);
  await page.click("button[data-testid='auth-submit']");

  await page.waitForURL("/dashboard");
};

export const createTestUser = async (overrides = {}) => {
  const userData = await auth.api.signUpEmail({
    body: {
      email: "test@test.com",
      name: "Test User",
      password: "password1234",
      ...overrides,
    },
  });
  if (!userData) throw new Error("User Test creation failed");

  return userData.user.id;
};
