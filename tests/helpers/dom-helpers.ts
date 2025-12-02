import { Locator, Page } from "@playwright/test";

export const clickWhenStable = async (locator: Locator) => {
  await locator.waitFor({ state: "visible", timeout: 20000 });

  const el = locator.first();
  const handle = await el.elementHandle();

  if (handle) {
    await handle.waitForElementState("stable", { timeout: 5000 });
  }
  await el.click();
};

export const fillWhenStable = async (locator: Locator, value: string) => {
  await locator.waitFor({ state: "visible", timeout: 20000 });

  const el = locator.first();
  const handle = await el.elementHandle();

  if (handle) {
    await handle.waitForElementState("stable", { timeout: 5000 });
  }
  await el.fill(value);
};

export const selectWhenStable = async (
  page: Page,
  selector: string,
  value: string
) => {
  const el = page.locator(selector);
  await el.waitFor({ state: "visible", timeout: 10000 });

  const option = el.locator(`option[value="${value}"]`);
  await option.waitFor({ state: "attached", timeout: 10000 });

  await page.selectOption(selector, { value });
};
