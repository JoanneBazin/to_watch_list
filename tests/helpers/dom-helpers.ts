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
  const select = page.locator(selector);
  await select.waitFor({ state: "visible", timeout: 30000 });

  console.log(`⏳ Waiting for option[value="${value}"]...`);
  const option = select.locator(`option[value="${value}"]`);
  await option.waitFor({ state: "attached", timeout: 60000 });
  console.log("✅ Option found");

  await page.selectOption(selector, { value });
  console.log("✅ Option selected");
};

export const getTMDBResultsWhenReady = async (
  page: Page,
  searchedMedia: string
) => {
  await page.fill("input[id='media-search']", searchedMedia);

  console.log("⏳ Waiting for TMDB results...");
  await Promise.all([
    page.waitForSelector(".search-media-card", {
      state: "visible",
      timeout: 60000,
    }),
    page.click("button[data-testid='search-media-btn']"),
  ]);

  console.log("✅ Medias displayed");
};
