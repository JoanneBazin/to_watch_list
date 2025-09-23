import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export const requireAuth = async (req?: Request) => {
  const requestHeaders = req?.headers || headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    throw new Error("Non autorisé");
  }

  return session;
};
