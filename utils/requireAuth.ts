import { auth } from "@/lib/auth";

export const requireAuth = async (req: Request) => {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    throw new Error("Non autorisé");
  }

  return session;
};
