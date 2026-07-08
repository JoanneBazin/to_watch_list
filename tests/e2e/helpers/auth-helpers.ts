import { prisma } from "@/src/lib/server";
import { Page } from "@playwright/test";
import { fillWhenStable } from "./dom-helpers";

interface User {
  name: string;
  email: string;
  password: string;
}

export const signUpUser = async (page: Page, credentials: User) => {
  await fillSignupForm(page, credentials);

  const submitBtn = page.getByTestId("auth-submit");

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
      `❌ Signup failed with status ${status} : retry-after: ${headers["x-retry-after"]}`,
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return user!!;
};

export const fillSignupForm = async (page: Page, credentials: User) => {
  await page.goto("/auth");
  await page.getByTestId("toggle-auth-form").click();

  const nameInput = page.getByTestId("name-input");
  const emailInput = page.getByTestId("email-input");
  const passwordInput = page.getByTestId("password-input");

  await fillWhenStable(nameInput, credentials.name);
  await fillWhenStable(emailInput, credentials.email);
  await fillWhenStable(passwordInput, credentials.password);
};

export const signInUser = async (
  page: Page,
  credentials: Omit<User, "name">,
  maxAttempts = 3,
) => {
  await fillLoginForm(page, credentials);

  const submitBtn = page.getByTestId("auth-submit");

  for (let i = 0; i < maxAttempts; i++) {
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes("/api/auth/sign-in")),
      submitBtn.click(),
    ]);
    if (response.status() === 200) {
      await page.waitForURL("/dashboard");
      return;
    }
    if (response.status() === 429) {
      const ra = parseInt(response.headers()["x-retry-after"] || "1", 10);
      await new Promise((r) => setTimeout(r, (ra + 1) * 1000));
      continue;
    }
    throw new Error(`login failed: ${response.status()}`);
  }
  throw new Error(`login failed after ${maxAttempts} attemps`);
};

export const fillLoginForm = async (
  page: Page,
  credentials: Omit<User, "name">,
) => {
  await page.goto("/auth");

  const emailInput = page.getByTestId("email-input");
  const passwordInput = page.getByTestId("password-input");

  await fillWhenStable(emailInput, credentials.email);
  await fillWhenStable(passwordInput, credentials.password);
};

export const stringOfLength = (length: number) => "a".repeat(length);
