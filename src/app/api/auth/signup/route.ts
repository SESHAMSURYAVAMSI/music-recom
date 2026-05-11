import { prisma } from "@/lib/db";

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Account created successfully",
    });
} catch (error: any) {
  console.log("SIGNUP ERROR:", error);

  return NextResponse.json(
    {
      message:
        error.message ||
        "Internal server error",
    },
    {
      status: 500,
    }
  );
}
}