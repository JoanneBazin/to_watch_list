import { getServerSession } from "next-auth";
import { AuthOptions } from "../../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/script";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);
  const receiverId = params.id;

  if (!session || !receiverId) {
    return NextResponse.json({ error: "Missing IDs" }, { status: 400 });
  }

  const senderId = session.user.id;

  const newRequest = await prisma.friendRequest.create({
    data: {
      senderId: senderId,
      receiverId: receiverId,
    },
  });

  return NextResponse.json(newRequest);
}
