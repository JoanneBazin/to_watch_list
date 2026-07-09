import { updateUserProfile } from "@/tests/shared-helpers/db-helpers";
import { expect, test } from "../fixtures/user.fixture";
import { signInUser, stringOfLength } from "../helpers/auth-helpers";
import { TEST_AVATAR_URL } from "../fixtures/constants";

test.describe("Profile managment", () => {
  test(
    "should display user avatar",
    { tag: ["@regression"] },
    async ({ page, user }) => {
      const avatarUrl = TEST_AVATAR_URL;

      await updateUserProfile(user.id, { image: avatarUrl });
      await signInUser(page, { email: user.email, password: user.password });

      const openMenuBtn = page.getByTestId("open-profile-menu");
      await expect(openMenuBtn.getByTestId("user-avatar")).toHaveAttribute(
        "src",
        /ifo1en01uy\.ufs\.sh/,
      );

      await updateUserProfile(user.id, { image: null });
    },
  );

  test("should update username and display it", async ({ page, user }) => {
    await signInUser(page, { email: user.email, password: user.password });
    const updatedName = "Updated User";

    const openMenuBtn = page.getByTestId("open-profile-menu");
    await openMenuBtn.click();
    await page.getByTestId("profile-nav").click();

    const profileTitle = page.getByTestId("profile-title");
    await expect(profileTitle).toBeVisible();
    await expect(profileTitle).toContainText(user.name);

    const nameInput = page.getByTestId("update-name-input");
    await expect(nameInput).toBeVisible();
    await nameInput.fill(updatedName);
    await page.getByTestId("name-update-btn").click();

    await expect(profileTitle).toContainText(updatedName);
    await expect(openMenuBtn).toContainText(updatedName);

    await updateUserProfile(user.id, { name: user.name });
  });

  test("shouldn't update username with invalid data", async ({
    page,
    user,
  }) => {
    await signInUser(page, { email: user.email, password: user.password });
    const updatedName = stringOfLength(21);

    const openMenuBtn = page.getByTestId("open-profile-menu");
    await openMenuBtn.click();
    await page.getByTestId("profile-nav").click();

    const profileTitle = page.getByTestId("profile-title");
    await expect(profileTitle).toBeVisible();
    await expect(profileTitle).toContainText(user.name);

    const nameInput = page.getByTestId("update-name-input");
    await expect(nameInput).toBeVisible();
    await nameInput.fill(updatedName);
    await page.getByTestId("name-update-btn").click();

    await expect(page.getByTestId("name-validation-error")).toBeVisible();
    await expect(profileTitle).toContainText(user.name);
    await expect(openMenuBtn).toContainText(user.name);
  });

  test("should update user avatar and display it", async ({ page, user }) => {
    await signInUser(page, { email: user.email, password: user.password });
    const updatedFile = "tests/e2e/fixtures/avatar-test.webp";

    const openMenuBtn = page.getByTestId("open-profile-menu");
    await openMenuBtn.click();
    await page.getByTestId("profile-nav").click();

    const profileTitleContainer = page.getByTestId("profile-title-container");
    await expect(profileTitleContainer).toBeVisible();

    const avatarInput = page.getByTestId("avatar-input");
    await expect(avatarInput).toBeVisible();
    await avatarInput.setInputFiles(updatedFile);
    await page.getByTestId("avatar-update-btn").click();

    await expect(
      profileTitleContainer.getByTestId("user-avatar"),
    ).toHaveAttribute("src", /ifo1en01uy\.ufs\.sh/);

    await updateUserProfile(user.id, { image: null });
  });

  test("shouldn't update user avatar with a wrong file format", async ({
    page,
    user,
  }) => {
    await signInUser(page, { email: user.email, password: user.password });
    const updatedFile = "tests/e2e/fixtures/avatar-test-file.txt";

    const openMenuBtn = page.getByTestId("open-profile-menu");
    await openMenuBtn.click();
    await page.getByTestId("profile-nav").click();

    const profileTitleContainer = page.getByTestId("profile-title-container");
    await expect(profileTitleContainer).toBeVisible();

    const avatarInput = page.getByTestId("avatar-input");
    await expect(avatarInput).toBeVisible();
    await avatarInput.setInputFiles(updatedFile);
    await page.getByTestId("avatar-update-btn").click();

    await expect(page.getByTestId("file-error")).toBeVisible();
  });
});
