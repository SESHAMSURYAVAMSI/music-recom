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

    const existing =
      await prisma.watchlist.findUnique({
        where: {
          userId_movieId: {
            userId: user.id,
            movieId,
          },
        },
      });

    if (existing) {
      await prisma.watchlist.delete({
        where: {
          userId_movieId: {
            userId: user.id,
            movieId,
          },
        },
      });

      return NextResponse.json({
        message: "Removed from watchlist",
      });
    }

    await prisma.watchlist.create({
      data: {
        userId: user.id,
        movieId,
      },
    });

    return NextResponse.json({
      message: "Added to watchlist",
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

export async function GET() {
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

    const watchlist =
      await prisma.watchlist.findMany({
        where: {
          userId: user.id,
        },

        include: {
          movie: true,
        },
      });

    return NextResponse.json(
      watchlist
    );
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