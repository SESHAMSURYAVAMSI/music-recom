"use client";

import { useState } from "react";

import TrailerModal from "./TrailerModal";

interface HeroTrailerProps {
  movieId: number;
}

export default function HeroTrailer({
  movieId,
}: HeroTrailerProps) {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [videoKey, setVideoKey] =
    useState("");

  const fetchTrailer = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/movies/trailer?movieId=${movieId}`
      );

      const data =
        await response.json();

      if (data.videoKey) {
        setVideoKey(data.videoKey);

        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={fetchTrailer}
        disabled={loading}
        className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
      >
        {loading
          ? "Loading..."
          : "▶ Watch Trailer"}
      </button>

      <TrailerModal
        open={open}
        onOpenChange={setOpen}
        videoKey={videoKey}
      />
    </>
  );
}