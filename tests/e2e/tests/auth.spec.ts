import {
  cleanUserInDb,
  createUserInDb,
} from "@/tests/shared-helpers/db-helpers";
import { expect, test } from "../fixtures/user.fixture";
import {
  fillLoginForm,
  fillSignupForm,
  signInUser,
  signUpUser,
  stringOfLength,
} from "../helpers/auth-helpers";

test.describe("Authentication", () => {
  test.describe("Signup", () => {
    const newUser = {
      name: "Auth user",
      email: "auth@test.com",
      password: "password1234",
    };

    test(
      "should signup new user and redirect to dashboard",
      { tag: ["@regression"] },
      async ({ page }) => {
        const user = await signUpUser(page, newUser);
        await expect(page.getByTestId("dashboard-nav")).toBeVisible();
        await expect(page.getByTestId("dashboard-section")).toBeVisible();
        await expect(page.getByTestId("open-profile-menu")).toContainText(
          newUser.name,
        );

        await cleanUserInDb(user.id);
      },
    );

    test(
      "shouldn't signup user using an existant email",
      { tag: ["@regression"] },
      async ({ page }) => {
        const existantUser = await createUserInDb();
        const credentials = { ...newUser, email: existantUser.email };

        await fillSignupForm(page, credentials);
        await page.getByTestId("auth-submit").click();

        const errorMessage = page.getByTestId("auth-error");
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/auth");
      },
    );

    const registrationFields = ["name", "email", "password"];

    for (const field of registrationFields) {
      test(`shouldn't signup user with a missing ${field}`, async ({
        page,
      }) => {
        const credentials = { ...newUser, [field]: "" };
        await fillSignupForm(page, credentials);
        await page.getByTestId("auth-submit").click();

        const errorMessage = page.getByTestId(`${field}-validation-error`);
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/auth");
      });
    }

    const registrationCases = [
      { field: "name", value: stringOfLength(21) },
      { field: "email", value: stringOfLength(10) },
      { field: "password", value: stringOfLength(7) },
    ];

    for (const { field, value } of registrationCases) {
      test(`shouldn't signup user with an invalid ${field}`, async ({
        page,
      }) => {
        const credentials = { ...newUser, [field]: value };
        await fillSignupForm(page, credentials);
        await page.getByTestId("auth-submit").click();

        const errorMessage = page.getByTestId(`${field}-validation-error`);
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/auth");
      });
    }
  });

  test.describe("Login", () => {
    test(
      "should login user and redirect to dashboard",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        const credentials = { email: user.email, password: user.password };
        await signInUser(page, credentials);

        await expect(page.getByTestId("dashboard-nav")).toBeVisible();
        await expect(page.getByTestId("dashboard-section")).toBeVisible();
        await expect(page.getByTestId("open-profile-menu")).toContainText(
          user.name,
        );
      },
    );

    const connectionFields = ["email", "password"];

    for (const field of connectionFields) {
      test(`shouldn't login user with a missing ${field}`, async ({
        page,
        user,
      }) => {
        const userData = { email: user.email, password: user.password };
        const credentials = { ...userData, [field]: "" };
        await fillLoginForm(page, credentials);
        await page.getByTestId("auth-submit").click();

        const errorMessage = page.getByTestId(`${field}-validation-error`);
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/auth");
      });
    }

    const connectionCases = [
      { field: "email", value: "random@test.com" },
      { field: "password", value: "wrongPassword1234" },
    ];

    for (const { field, value } of connectionCases) {
      test(`shouldn't login user with an invalid ${field} data`, async ({
        page,
        user,
      }) => {
        const userData = { email: user.email, password: user.password };
        const credentials = { ...userData, [field]: value };
        await fillLoginForm(page, credentials);
        await page.getByTestId("auth-submit").click();

        const errorMessage = page.getByTestId("auth-error");
        await expect(errorMessage).toBeVisible();
        await expect(page).toHaveURL("/auth");
      });
    }
  });

  test.describe("Logout", () => {
    test(
      "should logout user and block access to protected pages",
      { tag: ["@regression"] },
      async ({ page, user }) => {
        const credentials = { email: user.email, password: user.password };
        await signInUser(page, credentials);

        const profileNav = page.getByTestId("open-profile-menu");
        await expect(profileNav).toBeVisible();
        await profileNav.click();
        await page.getByTestId("signout-btn").filter({ visible: true }).click();

        await expect(page).toHaveURL("/auth");
        await page.goto("/dashboard");
        await expect(page).toHaveURL("/auth");
      },
    );
  });
});
