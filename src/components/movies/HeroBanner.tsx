"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeroTrailer from "./HeroTrailer";
import { useMovieStore } from "@/store/movieStore";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

interface HeroBannerProps {
  movies: Movie[];
}

export default function HeroBanner({ movies }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const addWatchlist = useMovieStore((state) => state.addWatchlist);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  const image = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  const handleMyList = () => {
    addWatchlist(currentMovie.id);

    toast.success("Added to watchlist");
  };

  return (
    <section
      className="relative flex h-screen items-end overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

      <div className="relative z-10 max-w-3xl p-10 pb-24">
        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
          Featured Movie
        </span>

        <h1 className="mt-6 text-7xl font-black leading-tight text-white transition-all duration-500">
          {currentMovie.title}
        </h1>

        <p className="mt-6 line-clamp-4 text-lg leading-relaxed text-zinc-300">
          {currentMovie.overview}
        </p>

        <div className="mt-8 flex gap-5">
          <HeroTrailer movieId={currentMovie.id} />

          <button
            onClick={handleMyList}
            className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            + My List
          </button>
        </div>

        {/* Slider Indicators */}
        <div className="mt-10 flex gap-3">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-10 bg-white" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
