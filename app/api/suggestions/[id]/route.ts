import prisma from "@/utils/script";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/options";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const suggestionId = params.id;
  const suggestion = await prisma.suggestion.findUnique({
    where: {
      id: suggestionId,
    },
  });
  return NextResponse.json(suggestion);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" });
  }

  const userId = session.user.id;
  const suggestId = params.id;
  const { receiverComment } = await req.json();

  if (!receiverComment) {
    return NextResponse.json({
      success: false,
      message: "No comment provided",
    });
  }

  try {
    const suggestion = await prisma.suggestion.findFirst({
      where: { id: suggestId },
    });

    if (!suggestion) {
      return NextResponse.json({
        success: false,
        message: "Suggestion not found",
      });
    }

    const updateSuggestion = await prisma.suggestion.update({
      where: {
        id: suggestion.id,
      },
      data: { receiverComment },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in PUT request : ", error);
    return NextResponse.json(
      { error: "Failed to update suggestion" },
      { status: 500 }
    );
  }
}
