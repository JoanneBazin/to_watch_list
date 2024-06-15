import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const suggestions = await prisma.serieSuggestion.findMany({
    where: {
      receiverId: userId,
    },
  });

  return NextResponse.json(suggestions);
}

export async function POST(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  const data = await req.json();

  const addSuggestion = await prisma.serieSuggestion.create({
    data: {
      senderId: userId,
      receiverId: data.receiverId,
      serieId: data.mediaId,
    },
  });
  return new NextResponse(JSON.stringify(addSuggestion), { status: 201 });
}
