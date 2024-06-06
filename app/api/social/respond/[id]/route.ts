import { NextResponse } from "next/server";
import { prisma } from "@/lib/script";

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  const requestId = params.id;
  const json = await req.json();

  const updateRequest = await prisma.friendRequest.update({
    where: {
      id: Number(requestId),
    },
    data: json,
  });

  return NextResponse.json(updateRequest);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleteRequest = await prisma.friendRequest.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return NextResponse.json(deleteRequest);
}
