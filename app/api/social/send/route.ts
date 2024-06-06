import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/script";

export async function POST(req: Request) {
  const session = await getServerSession(AuthOptions);
  const receiverId = await req.json();

  if (!session || !receiverId) {
    return NextResponse.json({ error: "Missing IDs" }, { status: 400 });
  }

  const senderId = session.user.id;

  const newRequest = await prisma.friendRequest.create({
    data: {
      senderId: parseInt(senderId, 10),
      receiverId: parseInt(receiverId, 10),
    },
  });

  return NextResponse.json(newRequest);
}
