import { prisma } from "@/src/lib/server";
import { handleApiRoute, requireAuth } from "@/src/utils/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return handleApiRoute(async () => {
    const session = await requireAuth(req);
    const userId = session.user.id;

    const suggestion = await prisma.usersWatchList.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            suggestions: {
              some: {
                status: "PENDING",
              },
            },
          },
        ],
      },
      select: {
        media: true,
        suggestions: {
          select: {
            id: true,
            senderComment: true,

            sender: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    const receivedSuggestions = suggestion.map((result) => ({
      ...result.media,
      suggestions: result.suggestions.map((suggest) => ({
        id: suggest.id,
        senderComment: suggest.senderComment,
        sender: {
          id: suggest.sender.id,
          name: suggest.sender.name,
          image: suggest.sender.image,
        },
      })),
    }));
    return NextResponse.json(receivedSuggestions);
  });
}
