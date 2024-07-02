import { prisma } from "@/lib/script";
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

  const suggestionId = params.id;
  const json = await req.json();

  const updateSuggestion = await prisma.suggestion.update({
    where: {
      id: suggestionId,
    },
    data: {
      status: "ACCEPTED",
    },
  });

  const updateWatchlist = await prisma.watchList.update({
    where: {
      id: json.id,
    },
    data: {
      users: {
        create: [
          {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        ],
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const suggestionId = params.id;

  const deleteUserSuggestion = await prisma.suggestion.delete({
    where: {
      id: suggestionId,
    },
  });

  return NextResponse.json(deleteUserSuggestion);
}