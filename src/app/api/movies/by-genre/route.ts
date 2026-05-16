import { NextRequest, NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  try {
    const genreId = req.nextUrl.searchParams.get("genreId");

    if (!genreId) {
      return NextResponse.json(
        {
          message: "Genre ID required",
        },
        {
          status: 400,
        },
      );
    }

    const response = await tmdb.get("/discover/movie", {
      params: {
        with_genres: genreId,
      },
    });

    return NextResponse.json(response.data.results);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch movies",
      },
      {
        status: 500,
      },
    );
  }
}
