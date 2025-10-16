import { prisma } from "@/src/lib/server";
import { requireAuth, handleApiRoute } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user: string } }
) {
  return handleApiRoute(async () => {
    const query = params.user;

    if (!query || typeof query !== "string") {
      throw new ApiError(400, "Requête invalide");
    }

    const session = await requireAuth(req);
    const userId = session.user.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
        image: true,
        id: true,
        friendRequestSent: {
          where: { receiverId: userId, status: { not: "REFUSED" } },
          select: { id: true, status: true },
        },
        friendRequestReceived: {
          where: { senderId: userId, status: { not: "REFUSED" } },
          select: { id: true, status: true },
        },
      },
    });

    if (users.length < 1) {
      throw new ApiError(404, "Pas de résultat");
    }

    const usersList = users.map((user) => {
      let friendshipStatus:
        | "none"
        | "friends"
        | "pending_sent"
        | "pending_received" = "none";
      let requestId;

      if (user.friendRequestSent.length > 0) {
        friendshipStatus =
          user.friendRequestSent[0].status === "ACCEPTED"
            ? "friends"
            : "pending_sent";
        requestId = user.friendRequestSent[0].id;
      } else if (user.friendRequestReceived.length > 0) {
        friendshipStatus =
          user.friendRequestReceived[0].status === "ACCEPTED"
            ? "friends"
            : "pending_received";
      }

      return {
        id: user.id,
        name: user.name,
        image: user.image,
        friendshipStatus,
        requestId,
      };
    });

    return NextResponse.json(usersList);
  });
}
