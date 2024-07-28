import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/script";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const media = await prisma.watchList.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(media);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await req.json();

  const updateMedia = await prisma.watchList.update({
    where: {
      id: id,
    },
    data: json,
  });
  return NextResponse.json(updateMedia);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const mediaId = params.id;

  const deleteUserMedia = await prisma.usersWatchList.delete({
    where: {
      userId_mediaId: {
        userId: userId,
        mediaId: mediaId,
      },
    },
  });

  return NextResponse.json(deleteUserMedia);
}
