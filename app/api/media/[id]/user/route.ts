import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth(req);
  const userId = session.user.id;
  const mediaId = params.id;

  const checkExistantLink = await prisma.usersWatchList.findUnique({
    where: {
      userId_mediaId: {
        userId: userId,
        mediaId: mediaId,
      },
    },
  });

  if (checkExistantLink) {
    const updateStatus = await prisma.suggestion.updateMany({
      where: {
        AND: [{ receiverId: userId }, { mediaId: mediaId }],
      },
      data: {
        status: "ACCEPTED",
      },
    });
  } else {
    const addExistantMedia = await prisma.usersWatchList.create({
      data: {
        userId: userId,
        mediaId: mediaId,
      },
    });
  }

  return NextResponse.json({ success: true });
}

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await requireAuth(req);
//   const userId = session.user.id;

//   const mediaId = params.id;
//   const json = await req.json();

//   const updateMedia = await prisma.usersWatchList.update({
//     where: {
//       userId_mediaId: {
//         userId: userId,
//         mediaId: mediaId,
//       },
//     },
//     data: json,
//   });
//   return NextResponse.json({ success: true });
// }
