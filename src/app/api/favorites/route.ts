import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

import { getCurrentUser } from "@/lib/getUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const {
      movieId,
      title,
      posterPath,
    } = body;

    let movie =
      await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

    // create movie if not exists
    if (!movie) {
      movie =
        await prisma.movie.create({
          data: {
            id: movieId,
            title,
            posterPath,
            genres: "",
          },
        });
    }

    const existingFavorite =
      await prisma.favorite.findUnique({
        where: {
          userId_movieId: {
            userId: user.id,
            movieId,
          },
        },
      });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          userId_movieId: {
            userId: user.id,
            movieId,
          },
        },
      });

      return NextResponse.json({
        message: "Removed from favorites",
      });
    }

    await prisma.favorite.create({
      data: {
        userId: user.id,
        movieId,
      },
    });

    return NextResponse.json({
      message: "Added to favorites",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}