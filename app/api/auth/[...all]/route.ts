import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// export const { POST, GET } = toNextJsHandler(auth);

const originalHandler = toNextJsHandler(auth);

import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  console.log("🔍 POST reçu sur /api/auth");
  const body = await req.clone().json();
  console.log("📦 Body reçu:", body);

  return originalHandler.POST(req);
};

export const { GET } = originalHandler;
