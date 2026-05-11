import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
}

export default function MovieCard({
  id,
  title,
  poster,
}: MovieCardProps) {
  return (
    <Link
      href={`/movies/${id}`}
      className="group relative min-w-[220px] cursor-pointer transition duration-300 hover:scale-105"
    >
      {/* ACTION BUTTONS */}
      <div className="absolute right-3 top-3 z-30 flex gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
      {/* Favorite button */}
        <FavoriteButton 
        movieId={id} 
        title={title}
  posterPath={poster}
  />
   
        {/* WatchList Button */}
        <WatchlistButton
  movieId={id}
  title={title}
  posterPath={poster}
/>
      </div>

      {/* CARD */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        <Image
          src={poster}
          alt={title}
          width={300}
          height={450}
          priority={false}
          className="h-[330px] w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-10 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {title}
          </h3>

          <button className="mt-3 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}