import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  const user2Id = params.id;

  if (!session) {
    return NextResponse.json({ error: "Lost session" }, { status: 400 });
  }

  const userId = session.user.name;

  const request = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        {
          senderId: userId,
          receiverId: user2Id,
        },
        {
          receiverId: userId,
          senderId: user2Id,
        },
      ],
    },
    select: {
      id: true,
      sender: {
        select: {
          id: true,
        },
      },
    },
  });

  return NextResponse.json(request);
}
