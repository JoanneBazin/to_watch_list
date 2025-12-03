import { auth, prisma } from "@/src/lib/server";
import { Page } from "@playwright/test";
import { fillWhenStable } from "./dom-helpers";

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

  await fillWhenStable(nameInput, "Test User");
  await fillWhenStable(emailInput, email);
  await fillWhenStable(passwordInput, password);

  const [response] = await Promise.all([
    page.waitForResponse((res) => res.url().includes("/api/auth/sign-up")),
    submitBtn.click(),
  ]);

  if (response.status() === 200) {
    await page.waitForURL("/dashboard");
  } else {
    const status = response.status();
    const headers = await response.allHeaders();
    console.log(
      `❌ Signup failed with status ${status} : retry-after: ${headers["x-retry-after"]}`
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  return user!!;
};

export const signInUser = async (
  page: Page,
  email: string,
  password: string,
  maxAttemps = 3
) => {
  await page.goto("/auth");

  const emailInput = page.locator("input[data-testid='email-input']");
  const passwordInput = page.locator("input[data-testid='password-input']");
  const submitBtn = page.locator("button[data-testid='auth-submit']");

  await fillWhenStable(emailInput, email);
  await fillWhenStable(passwordInput, password);

  for (let i = 0; i < maxAttemps; i++) {
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/auth/sign-up")),
      submitBtn.click(),
    ]);
    if (response.status() === 200) {
      await page.waitForURL("/dashboard");
      const user = await prisma.user.findUnique({ where: { email } });
      return user!!;
    }
    if (response.status() === 429) {
      const ra = parseInt(response.headers()["x-retry-after"] || "1", 10);
      await new Promise((r) => setTimeout(r, (ra + 1) * 1000));
      continue;
    }
    throw new Error(`signup failed: ${response.status()}`);
  }
  throw new Error(`signup failed after ${maxAttemps} attemps`);
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
