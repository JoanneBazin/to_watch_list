import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

export const handleApiRoute = async (fn: () => Promise<NextResponse>) => {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status }
      );
    }

    return NextResponse.json(
      { message: "Erreur inattendue, vueillez réessayer ultérieurement" },
      { status: 500 }
    );
  }
};
