import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getUser";

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
        },
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
      },

      include: {
        movie: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.log("GET FAVORITES ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch favorites",
      },
      {
        status: 500,
      },
    );
  }
}

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
        },
      );
    }

    const body = await req.json();

    const { movieId, title, posterPath } = body;

    if (!movieId || !title || !posterPath) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        {
          status: 400,
        },
      );
    }

    let movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    // create movie if not exists
    if (!movie) {
      movie = await prisma.movie.create({
        data: {
          id: movieId,
          title,
          posterPath,
          genres: "",
        },
      });
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: user.id,
          movieId,
        },
      },
    });

    // REMOVE FAVORITE
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
        success: true,
        action: "removed",
        message: "Removed from favorites",
      });
    }

    // ADD FAVORITE
    await prisma.favorite.create({
      data: {
        userId: user.id,
        movieId,
      },
    });

    return NextResponse.json({
      success: true,
      action: "added",
      message: "Added to favorites",
    });
  } catch (error) {
    console.log("POST FAVORITES ERROR:", error);

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
