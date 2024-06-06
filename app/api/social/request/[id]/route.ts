import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const receiverId = params.id;

  const receivedRequest = await prisma.friendRequest.findMany({
    where: {
      receiverId: parseInt(receiverId, 10),
      status: "PENDING",
    },
    select: {
      id: true,
      sender: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });

  return NextResponse.json(receivedRequest);
}
