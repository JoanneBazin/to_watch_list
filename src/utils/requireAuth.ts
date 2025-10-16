import { auth } from "@/src/lib";
import { headers } from "next/headers";
import { ApiError } from "./ApiError";

export const requireAuth = async (req?: Request) => {
  const requestHeaders = req?.headers || headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    throw new ApiError(401, "Authentification requise");
  }

  return session;
};
