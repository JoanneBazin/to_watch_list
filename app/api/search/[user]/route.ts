import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/script";

export async function GET(
  req: Request,
  { params }: { params: { user: string } }
) {
  const query = params.user;

  if (!query || typeof query !== "string") {
    return NextResponse.json({ message: "No results" }, { status: 400 });
  }

  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  const allUsers = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    select: {
      name: true,
      avatar: true,
      id: true,
    },
  });

  const results = allUsers.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const usersList = results.map((user) => ({
    ...user,
    avatar: user.avatar ? user.avatar.toString("base64") : null,
  }));

  return NextResponse.json(usersList);
}
