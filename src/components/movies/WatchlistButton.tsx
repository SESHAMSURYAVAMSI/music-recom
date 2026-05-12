"use client";

import { useState } from "react";

import axios from "axios";

import { Bookmark, Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useMovieStore } from "@/store/movieStore";

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
  const [loading, setLoading] =
    useState(false);

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
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    e.stopPropagation();

    if (loading) return;

    try {
      setLoading(true);

      await axios.post(
        "/api/watchlist",
        {
          movieId,
          title,
          posterPath,
        }
      );

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
    } catch (error) {
      console.log(error);

      toast.error(
        "Please Login then Add to watchlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      disabled={loading}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur-lg transition duration-300 hover:scale-110 hover:bg-black/80 disabled:opacity-50"
    >
      {loading ? (
        <Loader2
          size={18}
          className="animate-spin text-white"
        />
      ) : (
        <Bookmark
          size={18}
          className={`transition duration-300 ${
            isInWatchlist
              ? "fill-yellow-400 text-yellow-400"
              : "text-white"
          }`}
        />
      )}
    </button>
  );
}