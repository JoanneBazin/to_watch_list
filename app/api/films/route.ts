import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const films = await prisma.films.findMany({
    orderBy: {
      watched: "asc",
    },
  });

  return NextResponse.json(films);
}

export async function POST(req: Request) {
  const json = await req.json();

  const addFilm = await prisma.films.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(addFilm), { status: 201 });
}
