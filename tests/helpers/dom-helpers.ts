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
  await select.waitFor({ state: "visible", timeout: 10000 });

  await page.waitForFunction(
    ({ sel, val }) => {
      const selectEl = document.querySelector(sel) as HTMLSelectElement;
      if (!selectEl || selectEl.options.length < 1) return false;

      return Array.from(selectEl.options).some((opt) => opt.value === val);
    },
    { sel: selector, val: value },
    { timeout: 90000 }
  );

  const el = select.first();
  const handle = await el.elementHandle();
  if (handle) {
    await handle.waitForElementState("stable", { timeout: 30000 });
  }

  try {
    await select.selectOption(value);
  } catch (error) {
    console.error(`Failed to select value "${value}" from ${selector}`);
    throw error;
  }

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
