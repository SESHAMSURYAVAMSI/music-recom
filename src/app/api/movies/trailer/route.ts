import { NextRequest, NextResponse } from "next/server";

import { tmdb } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  try {
    const movieId = req.nextUrl.searchParams.get("movieId");

    if (!movieId) {
      return NextResponse.json(
        {
          message: "Movie ID required",
        },
        {
          status: 400,
        },
      );
    }

    const response = await tmdb.get(`/movie/${movieId}/videos`);

    const videos = response.data.results;

    // PRIORITY ORDER
    const preferredVideo =
      videos.find(
        (video: any) => video.site === "YouTube" && video.type === "Trailer",
      ) ||
      videos.find(
        (video: any) => video.site === "YouTube" && video.type === "Teaser",
      ) ||
      videos.find(
        (video: any) => video.site === "YouTube" && video.type === "Clip",
      ) ||
      videos.find((video: any) => video.site === "YouTube");

    if (!preferredVideo) {
      return NextResponse.json({
        videoKey: null,
      });
    }

    return NextResponse.json({
      videoKey: preferredVideo.key,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch trailer",
      },
      {
        status: 500,
      },
    );
  }
}
