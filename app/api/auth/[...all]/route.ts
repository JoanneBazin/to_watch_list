import { auth } from "@/src/lib/server";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

export const { POST, GET } = toNextJsHandler(auth);
