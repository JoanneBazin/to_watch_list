import { Page } from "@playwright/test";

export const getTMDBResultsWhenReady = async (
  page: Page,
  searchedMedia: string,
) => {
  await page.getByTestId("media-search-input").fill(searchedMedia);

  console.log("⏳ Waiting for TMDB results...");
  await Promise.all([
    page.waitForSelector(".search-media-card", {
      state: "visible",
      timeout: 60000,
    }),
    page.getByTestId("search-media-btn").click(),
  ]);

  console.log("✅ Medias displayed");
};
