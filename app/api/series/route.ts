import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const series = await prisma.series.findMany();
  return NextResponse.json(series);
}

export async function POST(req: Request) {
  const json = await req.json();

  const addSerie = await prisma.series.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(addSerie), { status: 201 });
}
