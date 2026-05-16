"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface HeroVideoBackgroundProps {
  movieId: number;
  image: string;
}

export default function HeroVideoBackground({
  movieId,
  image,
}: HeroVideoBackgroundProps) {
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `/api/movies/trailer?movieId=${movieId}`,
        );

        if (response.data.videoKey) {
          setVideoKey(response.data.videoKey);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (!videoKey) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        className="absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 scale-150 pointer-events-none"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&showinfo=0&modestbranding=1&rel=0`}
        title="Hero Trailer"
        allow="autoplay"
      />

      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
