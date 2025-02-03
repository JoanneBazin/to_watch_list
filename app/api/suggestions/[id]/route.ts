import prisma from "@/utils/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";

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
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const mediaId = params.id;
  const json = await req.json();

  const updateSuggestion = await prisma.suggestion.updateMany({
    where: {
      AND: [{ receiverId: userId }, { mediaId: mediaId }],
    },
    data: json,
  });

  return NextResponse.json({ success: true });
}
