import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET(req: Request) {
  const series = await prisma.series.findMany();
  const formattedSeries = series.map((user) => ({
    ...user,
    addedAt: format(new Date(user.addedAt), "dd-MM-yyyy"),
  }));
  return NextResponse.json(formattedSeries);
}

export async function POST(req: Request) {
  const json = await req.json();

  const addSerie = await prisma.series.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(addSerie), { status: 201 });
}
