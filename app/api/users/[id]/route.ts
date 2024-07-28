import prisma from "@/lib/script";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await req.json();

  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: json,
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(deleteUser);
}
