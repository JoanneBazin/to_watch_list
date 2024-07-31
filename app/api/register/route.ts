import { NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/script";

export async function POST(req: Request, res: NextApiResponse) {
  const json = await req.json();

  const hashedPassword = await bcrypt.hash(json.password, 10);

  const user = await prisma.user.create({
    data: {
      email: json.email,
      name: json.name,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ id: user.id, name: user.name, email: user.email });
}
