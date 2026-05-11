"use client";

import { Heart } from "lucide-react";

import axios from "axios";

import { toast } from "sonner";

import { useMovieStore } from "@/store/movieStore";

interface FavoriteButtonProps {
  movieId: number;
  title: string;
  posterPath: string;
}

export default function FavoriteButton({
  movieId,
  title,
  posterPath,
}: FavoriteButtonProps) {
  const favorites = useMovieStore(
    (state) => state.favorites
  );

  const addFavorite = useMovieStore(
    (state) => state.addFavorite
  );

  const removeFavorite = useMovieStore(
    (state) => state.removeFavorite
  );

  const isFavorite =
    favorites.includes(movieId);

  const toggleFavorite = async (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post("/api/favorites", {
  movieId,
  title,
  posterPath,
});

      if (isFavorite) {
        removeFavorite(movieId);

        toast.success(
          "Removed from favorites"
        );
      } else {
        addFavorite(movieId);

        toast.success(
          "Added to favorites"
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="rounded-full bg-black/60 p-3 backdrop-blur-lg transition hover:scale-105"
    >
      <Heart
        size={18}
        className={`transition ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-white"
        }`}
      />
    </button>
  );
}