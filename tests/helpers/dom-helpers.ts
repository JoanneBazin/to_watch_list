import { Locator, Page } from "@playwright/test";

export const clickWhenStable = async (locator: Locator) => {
  await locator.waitFor({ state: "visible", timeout: 60000 });

  const el = locator.first();
  const handle = await el.elementHandle();

  if (handle) {
    await handle.waitForElementState("stable", { timeout: 30000 });
  }
  await el.click();
};

export const fillWhenStable = async (locator: Locator, value: string) => {
  await locator.waitFor({ state: "visible", timeout: 30000 });

  const el = locator.first();
  const handle = await el.elementHandle();

  if (handle) {
    await handle.waitForElementState("stable", { timeout: 30000 });
  }
  await el.fill(value);
};

export const selectWhenStable = async (
  page: Page,
  selector: string,
  value: string
) => {
  console.log(`🔽 Selecting "${value}" in "${selector}"`);

  console.log("⏳ Waiting for categories API...");
  const response = await page.waitForResponse(
    (res) => res.url().includes("/api/category") && res.status() === 200,
    { timeout: 120000 }
  );
  console.log("✅ Categories loaded");

  const categories = await response.json();
  console.log("Categories received:", categories);

  const categoryExists = categories.some((cat: any) => cat.name === value);
  if (!categoryExists) {
    throw new Error(
      `Category "${value}" not found in API response: ${JSON.stringify(
        categories
      )}`
    );
  }

  const select = page.locator(selector);
  await select.waitFor({ state: "visible", timeout: 30000 });

  console.log(`⏳ Waiting for option[value="${value}"]...`);
  const option = select.locator(`option[value="${value}"]`);
  await option.waitFor({ state: "attached", timeout: 60000 });
  console.log("✅ Option found");

  await page.selectOption(selector, { value });
  console.log("✅ Option selected");
};

export const getTMDBResultsWhenReady = async (page: Page) => {
  console.log("⏳ Waiting for TMDB results...");
  Promise.all([
    page.waitForResponse(
      (res) => res.url().includes("/api/search/media") && res.status() === 200,
      { timeout: 120000 }
    ),
    page.click("button[data-testid='search-media-btn']"),
  ]);

  console.log("✅ Medias returned");
};
