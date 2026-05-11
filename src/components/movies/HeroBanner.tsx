"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import HeroTrailer from "./HeroTrailer";

import { useMovieStore } from "@/store/movieStore";

interface HeroBannerProps {
  id: number;

  title: string;

  overview: string;

  image: string;
}

export default function HeroBanner({
  id,
  title,
  overview,
  image,
}: HeroBannerProps) {
  const router = useRouter();

  const addWatchlist =
    useMovieStore(
      (state) => state.addWatchlist
    );

  const handleWatchNow = () => {
    router.push(`/movies/${id}`);
  };

  const handleMyList = () => {
    addWatchlist(id);

    toast.success(
      "Added to watchlist"
    );
  };

  return (
    <section
      className="relative flex h-screen items-end overflow-hidden bg-cover bg-center"
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

        <h1 className="mt-6 text-7xl font-black leading-tight text-white">
          {title}
        </h1>

        <p className="mt-6 line-clamp-4 text-lg leading-relaxed text-zinc-300">
          {overview}
        </p>

        <div className="mt-8 flex gap-5">
          {/* <button
            onClick={handleWatchNow}
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            ▶ Watch Now
          </button> */}
          <HeroTrailer movieId={id} />

          <button
            onClick={handleMyList}
            className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            + My List
          </button>
        </div>
      </div>
    </section>
  );
}