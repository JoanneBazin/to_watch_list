import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const suggestionId = params.id;
  const suggestion = await prisma.suggestion.findUnique({
    where: {
      id: suggestionId,
    },
  });
  return NextResponse.json(suggestion);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const suggestionId = params.id;
  const json = await req.json();

  const updateSuggestion = await prisma.suggestion.update({
    where: {
      id: suggestionId,
    },
    data: json,
  });

  return NextResponse.json({ success: true });
}
