import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("MISSING PARAMETERS", { status: 400 });
    }

    const salt = process.env.SALT as string;
    const hashedPassword = await bcrypt.hash(password + salt, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION ERROR");
    return new NextResponse("SERVER ERROR", { status: 500 });
  }
}
