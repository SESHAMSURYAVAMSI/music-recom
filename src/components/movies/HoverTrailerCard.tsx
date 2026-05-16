"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";

interface HoverTrailerCardProps {
  id: number;
  title: string;
  poster: string;
}

export default function HoverTrailerCard({
  id,
  title,
  poster,
}: HoverTrailerCardProps) {
  const [hovered, setHovered] = useState(false);

  const [videoKey, setVideoKey] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!hovered || videoKey) return;

      try {
        setLoading(true);

        const response = await axios.get(`/api/movies/trailer?movieId=${id}`);

        setVideoKey(response.data.videoKey);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [hovered, id, videoKey]);

  return (
    <Link
      href={`/movies/${id}`}
      className="group relative block overflow-hidden rounded-3xl transition duration-300 hover:z-30 hover:scale-110"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[330px] w-full overflow-hidden rounded-3xl bg-black">
        {hovered && videoKey && !loading ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
            title={title}
            allow="autoplay"
            className="h-full w-full scale-[1.4]"
          />
        ) : (
          <Image
            src={poster}
            alt={title}
            width={300}
            height={450}
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        <div className="absolute right-3 top-3 z-20 flex gap-2 opacity-0 transition group-hover:opacity-100">
          <FavoriteButton movieId={id} title={title} posterPath={poster} />

          <WatchlistButton movieId={id} title={title} posterPath={poster} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <h3 className="line-clamp-1 text-lg font-bold text-white">{title}</h3>

          <p className="text-sm text-zinc-300">
            {hovered ? "Playing Preview" : "Hover to preview"}
          </p>
        </div>
      </div>
    </Link>
  );
}
