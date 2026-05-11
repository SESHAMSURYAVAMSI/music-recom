"use client";

import { useMovieStore } from "@/store/movieStore";

export default function WatchlistPage() {
  const watchlist =
    useMovieStore(
      (state) => state.watchlist
    );

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold">
        Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <p className="text-zinc-400">
          No movies in watchlist.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {watchlist.map((movieId) => (
            <div
              key={movieId}
              className="rounded-2xl bg-white/5 p-6"
            >
              Movie ID: {movieId}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}