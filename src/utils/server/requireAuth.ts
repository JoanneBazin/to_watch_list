import { auth } from "@/src/lib/server";
import { headers } from "next/headers";
import { ApiError } from "../shared";

export const requireAuth = async (req?: Request) => {
  const requestHeaders = req?.headers || headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    throw new ApiError(401, "Authentification requise");
  }

  return session;
};
