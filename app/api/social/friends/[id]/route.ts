import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const friend = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
    },
  });
  return NextResponse.json(friend);
}
