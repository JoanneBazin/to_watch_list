import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/options";
import prisma from "@/lib/script";

export async function GET(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Lost session" }, { status: 400 });
  }

  const userId = session.user.id;

  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
    },
  });

  if (userProfile && userProfile.avatar) {
    userProfile.avatar = userProfile.avatar.toString("base64") as any;
  }

  return NextResponse.json(userProfile);
}

export async function PUT(req: Request) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json({ error: "Lost session" }, { status: 400 });
  }

  const userId = session.user.id;
  const json = await req.json();

  const updateUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: json,
  });

  return NextResponse.json({ success: true });
}
