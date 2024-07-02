import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const userId = session.user.id;
  const mediaId = params.id;
  const json = await req.json();

  const updateMedia = await prisma.usersWatchList.update({
    where: {
      userId_mediaId: {
        userId: userId,
        mediaId: mediaId,
      },
    },
    data: json,
  });
  return NextResponse.json(updateMedia);
}
