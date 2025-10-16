import { prisma } from "@/src/lib/server";
import { handleApiRoute } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return handleApiRoute(async () => {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (!categories.length) {
      throw new ApiError(404, "Aucune catégorie trouvée");
    }

    return NextResponse.json(categories);
  });
}

export async function POST(req: Request) {
  const json = await req.json();

  const addCategory = await prisma.category.create({
    data: json,
  });
  return new NextResponse(JSON.stringify(addCategory), { status: 201 });
}
