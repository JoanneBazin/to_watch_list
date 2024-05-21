import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const film = await prisma.films.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(film);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await req.json();

  const updateFilm = await prisma.films.update({
    where: {
      id: parseInt(id, 10),
    },
    data: json,
  });
  return NextResponse.json(updateFilm);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleteFilm = await prisma.films.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(deleteFilm);
}
