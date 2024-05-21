import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const json = await req.json();

  const addCategory = await prisma.category.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(addCategory), { status: 201 });
}
