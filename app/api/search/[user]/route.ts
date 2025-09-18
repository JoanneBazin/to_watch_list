import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user: string } }
) {
  const query = params.user;

  if (!query || typeof query !== "string") {
    return NextResponse.json({ message: "No results" }, { status: 400 });
  }

  const session = await requireAuth(req);
  const userId = session.user.id;

  const allUsers = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: {
      name: true,
      image: true,
      id: true,
    },
  });

  const usersList = allUsers.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(usersList);
}
