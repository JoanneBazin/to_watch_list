import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth(req);

  const sender = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  const receiver = await prisma.user.findUnique({ where: { id: params.id } });

  if (!sender) {
    throw new Error("Sender not found");
  }
  if (!receiver) {
    throw new Error("Receiver not found");
  }

  const newRequest = await prisma.friendRequest.create({
    data: {
      senderId: sender.id,
      receiverId: receiver.id,
      status: "PENDING",
    },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const requestId = await prisma.friendRequest.findUnique({
    where: { id: params.id },
  });
  const json = await req.json();

  if (!requestId) {
    throw new Error("No request found");
  }

  const updateRequest = await prisma.friendRequest.update({
    where: {
      id: requestId.id,
    },
    data: json,
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const requestId = await prisma.friendRequest.findUnique({
    where: { id: params.id },
  });

  if (!requestId) {
    throw new Error("No request found");
  }

  const deleteRequest = await prisma.friendRequest.delete({
    where: {
      id: requestId.id,
    },
  });

  return NextResponse.json({ success: true });
}
