import { prisma } from "@/lib/db";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 400,
        },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 400,
        },
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set({
      name: "token",
      value: token,

      httpOnly: true,

      secure: false,

      sameSite: "lax",

      path: "/",

      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
