"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Image from "next/image";

import Link from "next/link";

import TrailerButton from "@/components/movies/TrailerButton";

import FavoriteButton from "@/components/movies/FavoriteButton";

import WatchlistButton from "@/components/movies/WatchlistButton";

interface WatchlistMovie {
  movie: {
    id: number;
    title: string;
    posterPath: string;
  };
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] =
    useState<WatchlistMovie[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchWatchlist =
      async () => {
        try {
          const response =
            await axios.get(
              "/api/watchlist"
            );

          setWatchlist(
            response.data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading watchlist...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold">
        My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <p className="text-zinc-400">
          No movies in watchlist.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {watchlist.map((item) => {
            const movie =
              item.movie;

            return (
              <div
                key={movie.id}
                className="group overflow-hidden rounded-3xl bg-white/5"
              >
                <Link
                  href={`/movies/${movie.id}`}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-4">
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {movie.title}
                  </h2>

                  <div className="mt-4 flex items-center gap-3">
                    <TrailerButton
                      movieId={
                        movie.id
                      }
                    />

                    <FavoriteButton
                      movieId={
                        movie.id
                      }
                      title={
                        movie.title
                      }
                      posterPath={
                        movie.posterPath
                      }
                    />

                    <WatchlistButton
                      movieId={
                        movie.id
                      }
                      title={
                        movie.title
                      }
                      posterPath={
                        movie.posterPath
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}