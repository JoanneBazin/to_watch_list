import { cleanDatabase } from "../shared-helpers/db-helpers";

export async function teardown() {
  await cleanDatabase();
}
