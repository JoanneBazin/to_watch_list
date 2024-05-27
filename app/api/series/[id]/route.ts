import { prisma } from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const serie = await prisma.series.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(serie);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await req.json();

  const updateSerie = await prisma.series.update({
    where: {
      id: parseInt(id, 10),
    },
    data: json,
  });
  return NextResponse.json(updateSerie);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleteSerie = await prisma.series.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
  return NextResponse.json(deleteSerie);
}
