import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
}
