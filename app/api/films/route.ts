import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET(req: Request) {
  const films = await prisma.films.findMany();
  const formattedFilms = films.map((user) => ({
    ...user,
    addedAt: format(new Date(user.addedAt), "dd-MM-yyyy"),
  }));
  return NextResponse.json(formattedFilms);
}

export async function POST(req: Request) {
  const json = await req.json();

  const addFilm = await prisma.films.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(addFilm), { status: 201 });
}
