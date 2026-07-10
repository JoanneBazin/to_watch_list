import { cleanDatabase } from "../shared-helpers/db-helpers";

export default async function globalTeardown() {
  await cleanDatabase();
  console.log("✅ Nettoyage DB OK");
}
