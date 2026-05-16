"use client";

import { useState } from "react";
import axios from "axios";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMovieStore } from "@/store/movieStore";

interface FavoriteButtonProps {
  movieId: number;

  title: string;

  posterPath: string;

  onRemove?: (movieId: number) => void;
}

export default function FavoriteButton({
  movieId,
  title,
  posterPath,
  onRemove,
}: FavoriteButtonProps) {
  const [loading, setLoading] = useState(false);

  const favorites = useMovieStore((state) => state.favorites);

  const addFavorite = useMovieStore((state) => state.addFavorite);

  const removeFavorite = useMovieStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(movieId);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    e.stopPropagation();

    if (loading) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/favorites", {
        movieId,
        title,
        posterPath,
      });

      const message = response.data.message;

      // REMOVE
      if (message === "Removed from favorites") {
        removeFavorite(movieId);

        onRemove?.(movieId);

        toast.success("Removed successfully");
      }

      // ADD
      else if (message === "Added to favorites") {
        addFavorite(movieId);

        toast.success("Added to favorites");
      }
    } catch (error: any) {
      console.log(error);

      // UNAUTHORIZED
      if (error?.response?.status === 401) {
        toast.error("Please login first");
      }

      // OTHER ERRORS
      else {
        toast.error("Failed to update favorites");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur-lg transition duration-300 hover:scale-110 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin text-white" />
      ) : (
        <Heart
          size={18}
          className={`transition duration-300 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      )}
    </button>
  );
}
