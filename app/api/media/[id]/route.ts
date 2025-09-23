import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth(req);
  const userId = session.user.id;
  const mediaId = params.id;

  const media = await prisma.usersWatchList.findUnique({
    where: {
      userId_mediaId: {
        userId: userId,
        mediaId: mediaId,
      },
      OR: [
        {
          suggestions: {
            some: {
              status: "ACCEPTED",
            },
          },
        },
        {
          suggestions: {
            none: {},
          },
        },
      ],
    },
  });
  if (media) {
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
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
  return NextResponse.json({ success: true });
}

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await requireAuth(req);
//   const userId = session.user.id;
//   const mediaId = params.id;

//   const deleteUserMedia = await prisma.usersWatchList.delete({
//     where: {
//       userId_mediaId: {
//         userId: userId,
//         mediaId: mediaId,
//       },
//     },
//   });

//   return NextResponse.json({ success: true });
// }
