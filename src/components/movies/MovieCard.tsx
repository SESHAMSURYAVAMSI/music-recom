import Image from "next/image";

import Link from "next/link";

import FavoriteButton from "./FavoriteButton";

import WatchlistButton from "./WatchlistButton";

import TrailerButton from "./TrailerButton";

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
      className="group relative min-w-[220px] overflow-hidden rounded-3xl transition duration-300 hover:z-20 hover:scale-110"
    >
      <Image
        src={poster}
        alt={title}
        width={300}
        height={450}
        className="h-[330px] w-full object-cover transition duration-500 group-hover:brightness-50"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="absolute right-3 top-3 z-20 flex gap-2 opacity-0 transition group-hover:opacity-100">
        <FavoriteButton
  movieId={id}
  title={title}
  posterPath={poster}
/>

        <WatchlistButton movieId={id} 
          title={title}
  posterPath={poster}/>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 opacity-0 transition group-hover:opacity-100">
        <div className="mb-3 flex items-center gap-3">
          <TrailerButton movieId={id} />

          <div>
            <h3 className="font-semibold text-white">
              {title}
            </h3>

            <p className="text-sm text-zinc-300">
              Watch Trailer
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}