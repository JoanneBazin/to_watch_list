import prisma from "@/utils/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      _count: {
        select: {
          friendRequestReceived: {
            where: {
              status: "PENDING",
            },
          },
          suggestionsReceived: {
            where: {
              status: "PENDING",
            },
          },
        },
      },
    },
  });

  if (user && user.avatar) {
    user.avatar = user.avatar.toString("base64") as any;
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { file } = await req.json();
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const avatarData = Buffer.from(file, "base64");

  const updateUserAvatar = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      avatar: avatarData,
    },
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ success: true });
}
