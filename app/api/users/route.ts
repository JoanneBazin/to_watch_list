import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await requireAuth(req);
  const userId = session.user.id;
  console.log(userId);

  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  });

  if (!userProfile)
    return NextResponse.json(
      { error: "Utilisateur non trouvé" },
      { status: 404 }
    );

  return NextResponse.json(userProfile);
}

export async function PUT(req: Request) {
  const session = await requireAuth(req);
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
