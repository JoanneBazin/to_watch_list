import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user: string } }
) {
  const query = params.user;

  if (!query || typeof query !== "string") {
    return NextResponse.json({ message: "No results" }, { status: 400 });
  }
  const allUsers = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      avatar: true,
      id: true,
    },
  });

  const results = allUsers.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
  return NextResponse.json(results);
}
