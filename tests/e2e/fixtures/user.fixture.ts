import {
  createUserInDb,
  cleanUserInDb,
} from "@/tests/shared-helpers/db-helpers";
import { test as baseTest } from "@playwright/test";

export * from "@playwright/test";

export const test = baseTest.extend<
  {},
  { user: { email: string; password: string; name: string; id: string } }
>({
  user: [
    async ({}, use) => {
      const user = await createUserInDb();
      console.log(`🔧 Worker user ${user.name} créé en DB`);

      try {
        await use(user);
      } finally {
        console.log(`🧹 Suppression user: ${user.email}`);
        await cleanUserInDb(user.id);
      }
    },
    { scope: "worker" },
  ],
  page: async ({ page }, use) => {
    await page.context().clearCookies();
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await use(page);
  },
});
