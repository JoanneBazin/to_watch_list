import { cleanWatchlist } from "./cleanWatchlist";
import { updateTmdbMedia } from "./updateTmdbMedia";

async function runMaintenance() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Maintenance ignorée (hors prod)");
    return;
  }

  await updateTmdbMedia();
  await cleanWatchlist();
  console.log("Maintenance terminée");
}

runMaintenance()
  .catch(console.error)
  .finally(() => process.exit());
