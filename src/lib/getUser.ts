import { cookies } from "next/headers";

import { verifyToken } from "./auth";

import { prisma } from "./db";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token) as {
      id: string;
    };

    if (!decoded?.id) {
      return null;
    }

    const user =
      await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
}