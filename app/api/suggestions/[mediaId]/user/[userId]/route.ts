import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface SuggestionsParamsProps {
  params: {
    mediaId: string;
    userId: string;
  };
}

export async function GET(req: Request, { params }: SuggestionsParamsProps) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const senderId = session.user.id;
  const { mediaId, userId } = params;

  const findSuggest = await prisma.suggestion.findMany({
    where: {
      AND: [
        { senderId: senderId },
        { receiverId: userId },
        { mediaId: mediaId },
      ],
    },
  });

  if (!findSuggest || findSuggest.length < 1) {
    return NextResponse.json(false);
  }

  return NextResponse.json(true);
}

export async function POST(req: Request, { params }: SuggestionsParamsProps) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const senderId = session.user.id;
  const { mediaId, userId } = params;
  const data = await req.json();

  const addSuggestionExistantMedia = await prisma.suggestion.create({
    data: {
      senderId: senderId,
      receiverId: userId,
      mediaId: mediaId,
      senderComment: data.comment,
    },
  });
  return NextResponse.json(addSuggestionExistantMedia);
}