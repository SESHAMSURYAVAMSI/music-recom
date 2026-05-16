"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Sparkles } from "lucide-react";
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
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

  const [loading, setLoading] = useState(true);

  // REMOVE MOVIE INSTANTLY FROM UI
  const handleRemoveMovie = (movieId: number) => {
    setWatchlist((prev) => prev.filter((item) => item.movie.id !== movieId));
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get("/api/watchlist");

        setWatchlist(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  // LOADING SCREEN
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <div className="flex flex-col items-center gap-5">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />

          <p className="text-lg text-zinc-400">Loading watchlist...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 backdrop-blur-xl">
            <Sparkles size={16} />
            Your Saved Collection
          </div>

          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            My Watchlist 🍿
          </h1>

          <p className="mt-3 text-zinc-400">
            Movies waiting for your next binge session.
          </p>
        </div>

        {/* Stats Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/20 text-yellow-400">
              <Bookmark size={28} />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Total Saved</p>

              <h2 className="text-3xl font-bold">{watchlist.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {watchlist.length === 0 ? (
        <div className="relative z-10 flex min-h-[50vh] flex-col items-center justify-center rounded-[40px] border border-white/10 bg-white/5 text-center backdrop-blur-2xl">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400">
            <Bookmark size={40} />
          </div>

          <h2 className="text-3xl font-bold">Your Watchlist Is Empty</h2>

          <p className="mt-3 max-w-md text-zinc-400">
            Save movies to your watchlist and build your perfect movie marathon.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 rounded-2xl bg-yellow-500 px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-yellow-400"
          >
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {watchlist.map((item) => {
            const movie = item.movie;

            return (
              <div
                key={movie.id}
                className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:bg-white/10"
              >
                {/* Poster */}
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
                    />

                    <WatchlistButton
                      movieId={movie.id}
                      title={movie.title}
                      posterPath={movie.posterPath}
                      onRemove={handleRemoveMovie}
                    />
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h2 className="line-clamp-1 text-xl font-bold text-white">
                      {movie.title}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-300">
                      Saved to watchlist
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
