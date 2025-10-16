import { prisma } from "@/src/lib/server";
import { handleApiRoute, requireAuth } from "@/src/utils/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return handleApiRoute(async () => {
    const session = await requireAuth(req);
    const userId = session.user.id;

    const receivedRequests = await prisma.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(receivedRequests);
  });
}
