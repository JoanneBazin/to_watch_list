import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const filmId = params.id;

  const suggestion = await prisma.filmSuggestion.findMany({
    select: {
      receiverId: true,
    },
    where: {
      AND: [{ senderId: userId }, { filmId: filmId }],
    },
  });
  return NextResponse.json(suggestion);
}
