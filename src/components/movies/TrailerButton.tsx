"use client";

import { useState } from "react";
import TrailerModal from "./TrailerModal";
import { toast } from "sonner";
interface TrailerButtonProps {
  movieId: number;
}

export default function TrailerButton({ movieId }: TrailerButtonProps) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [videoKey, setVideoKey] = useState("");

  const fetchTrailer = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`/api/movies/trailer?movieId=${movieId}`);

      const data = await response.json();

      if (data.videoKey) {
        setVideoKey(data.videoKey);

        setOpen(true);
      } else {
        toast.error("Trailer not available");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={fetchTrailer}
        disabled={loading}
        className="rounded-full bg-white p-3 text-black transition hover:scale-110"
      >
        ▶
      </button>

      <TrailerModal open={open} onOpenChange={setOpen} videoKey={videoKey} />
    </>
  );
}
