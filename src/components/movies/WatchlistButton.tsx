"use client";

import { Bookmark } from "lucide-react";

import { useMovieStore } from "@/store/movieStore";

import axios from "axios";

import { toast } from "sonner";

interface WatchlistButtonProps {
  movieId: number;
  title: string;
  posterPath: string;
}

export default function WatchlistButton({
  movieId,
  title,
  posterPath,
}: WatchlistButtonProps) {
  const watchlist =
    useMovieStore(
      (state) => state.watchlist
    );

  const addWatchlist =
    useMovieStore(
      (state) => state.addWatchlist
    );

  const removeWatchlist =
    useMovieStore(
      (state) => state.removeWatchlist
    );

  const isInWatchlist =
    watchlist.includes(movieId);

  const toggleWatchlist = async (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post("/api/watchlist", {
  movieId,
  title,
  posterPath,
});

      if (isInWatchlist) {
        removeWatchlist(movieId);

        toast.success(
          "Removed from watchlist"
        );
      } else {
        addWatchlist(movieId);

        toast.success(
          "Added to watchlist"
        );
      }
    } catch {
      toast.error("Please login first");
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className="rounded-full bg-black/60 p-3 backdrop-blur-lg transition hover:scale-105"
    >
      <Bookmark
        className={`transition ${
          isInWatchlist
            ? "fill-yellow-400 text-yellow-400"
            : "text-white"
        }`}
        size={18}
      />
    </button>
  );
}