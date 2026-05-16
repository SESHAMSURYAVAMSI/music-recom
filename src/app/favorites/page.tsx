"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import TrailerButton from "@/components/movies/TrailerButton";
import FavoriteButton from "@/components/movies/FavoriteButton";
import WatchlistButton from "@/components/movies/WatchlistButton";

interface FavoriteMovie {
  movie: {
    id: number;
    title: string;
    posterPath: string;
  };
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  const [loading, setLoading] = useState(true);

  // REMOVE MOVIE INSTANTLY FROM UI
  const handleRemoveMovie = (movieId: number) => {
    setFavorites((prev) => prev.filter((item) => item.movie.id !== movieId));
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites");

        setFavorites(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // LOADING SCREEN
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <div className="flex flex-col items-center gap-5">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />

          <p className="text-lg text-zinc-400">Loading favorites...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-red-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 backdrop-blur-xl">
            <Sparkles size={16} />
            Your Personal Collection
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Favorite Movies ❤️
          </h1>

          <p className="mt-3 text-zinc-400">
            Movies you loved and saved forever.
          </p>
        </div>

        {/* Stats Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
              <Heart size={28} />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Total Favorites</p>

              <h2 className="text-3xl font-bold">{favorites.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center rounded-[40px] border border-white/10 bg-white/5 text-center backdrop-blur-2xl">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <Heart size={40} />
          </div>

          <h2 className="text-3xl font-bold">No Favorites Yet</h2>

          <p className="mt-3 max-w-md text-zinc-400">
            Start adding movies to your favorites and build your cinematic
            collection.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 rounded-2xl bg-red-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-red-500"
          >
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((favorite) => {
            const movie = favorite.movie;

            return (
              <div
                key={movie.id}
                className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:bg-white/10"
              >
                {/* POSTER */}
                <Link
                  href={`/movies/${movie.id}`}
                  className="relative block overflow-hidden"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

                  {/* Hover Buttons */}
                  <div className="absolute right-4 top-4 flex flex-col gap-3 opacity-0 transition duration-300 group-hover:opacity-100">
                    <FavoriteButton
                      movieId={movie.id}
                      title={movie.title}
                      posterPath={movie.posterPath}
                      onRemove={handleRemoveMovie}
                    />

                    <WatchlistButton
                      movieId={movie.id}
                      title={movie.title}
                      posterPath={movie.posterPath}
                    />
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="line-clamp-1 text-xl font-bold text-white">
                      {movie.title}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-300">
                      Added to favorites
                    </p>
                  </div>
                </Link>

                {/* Footer Actions */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <TrailerButton movieId={movie.id} />

                    <span className="text-sm text-zinc-400">Watch Trailer</span>
                  </div>

                  <Link
                    href={`/movies/${movie.id}`}
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 py-6 text-center text-sm text-zinc-500">
        © 2026 CineVerse. All rights reserved by Surya Vamsi S.
      </footer>
    </main>
  );
}
