import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
    select: {
      Films: true,
      Series: true,
    },
  });
  return NextResponse.json(category);
}
