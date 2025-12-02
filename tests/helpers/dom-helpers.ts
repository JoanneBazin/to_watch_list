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
  const el = page.locator(selector);
  await el.waitFor({ state: "visible", timeout: 30000 });

  const option = el.locator(`option[value="${value}"]`);
  await option.waitFor({ state: "attached", timeout: 30000 });

  await page.selectOption(selector, { value });
};
