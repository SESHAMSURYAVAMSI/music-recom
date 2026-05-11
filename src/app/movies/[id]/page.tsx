import Image from "next/image";

import FavoriteButton from "@/components/movies/FavoriteButton";
import WatchlistButton from "@/components/movies/WatchlistButton";

import { tmdb, imageBaseUrl } from "@/lib/tmdb";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMovie(id: string) {
  const response = await tmdb.get(
    `/movie/${id}`
  );

  return response.data;
}

async function getSimilarMovies(id: string) {
  const response = await tmdb.get(
    `/movie/${id}/similar`
  );

  return response.data.results;
}

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const movie = await getMovie(id);

  const similarMovies =
    await getSimilarMovies(id);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <div className="relative h-[90vh] overflow-hidden">
        <Image
          src={`${imageBaseUrl}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 z-20 max-w-4xl p-10">
          <p className="mb-3 text-sm uppercase tracking-[5px] text-zinc-400">
            Featured Movie
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            {movie.title}
          </h1>

          {/* STATS */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
            <span>
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>

            <span>
              📅 {movie.release_date}
            </span>

            <span>
              🎬 {movie.runtime} min
            </span>
          </div>

          {/* OVERVIEW */}
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
            {movie.overview}
          </p>

          {/* GENRES */}
          <div className="mt-6 flex flex-wrap gap-3">
            {movie.genres.map(
              (genre: any) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm backdrop-blur-lg"
                >
                  {genre.name}
                </span>
              )
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex items-center gap-4">
            <button className="rounded-xl bg-white px-8 py-3 font-semibold text-black transition hover:bg-zinc-200">
              ▶ Watch Now
            </button>
             
             {/* FavoriteButton */}
            <FavoriteButton
  movieId={movie.id}
  title={movie.title}
  posterPath={`${imageBaseUrl}${movie.poster_path}`}
/>
             
             {/* watchlistButton */}
            <WatchlistButton
  movieId={movie.id}
  title={movie.title}
  posterPath={`${imageBaseUrl}${movie.poster_path}`}
/>
          </div>
        </div>
      </div>

      {/* SIMILAR MOVIES */}
      <section className="px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Similar Movies
          </h2>

          <button className="text-sm text-zinc-400 transition hover:text-white">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
          {similarMovies.map((movie: any) => (
            <div
              key={movie.id}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-2xl transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-3 line-clamp-2 text-sm font-medium text-white">
                {movie.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}