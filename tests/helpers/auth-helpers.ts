import { auth, prisma } from "@/src/lib/server";
import { Page } from "@playwright/test";

export const signUpUser = async (
  page: Page,
  email: string,
  password: string
) => {
  await page.goto("/auth");
  await page.click("button[data-testid='toggle-auth-form']");

  const nameInput = page.locator("input[data-testid='name-input']");
  const emailInput = page.locator("input[data-testid='email-input']");
  const passwordInput = page.locator("input[data-testid='password-input']");
  const submitBtn = page.locator("button[data-testid='auth-submit']");

  await nameInput.fill("Test User");
  await emailInput.fill(email);
  await passwordInput.fill(password);

  await Promise.all([page.waitForURL("/dashboard"), submitBtn.click()]);

  const user = await prisma.user.findUnique({ where: { email } });
  return user!!;
};

export const signInUser = async (
  page: Page,
  email: string,
  password: string
) => {
  await page.goto("/auth");

  const emailInput = page.locator("input[data-testid='email-input']");
  const passwordInput = page.locator("input[data-testid='password-input']");
  const submitBtn = page.locator("button[data-testid='auth-submit']");

  await emailInput.fill(email);
  await passwordInput.fill(password);

  await Promise.all([page.waitForURL("/dashboard"), submitBtn.click()]);
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
