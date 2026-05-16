import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>

        <button className="text-sm text-zinc-400 transition hover:text-white">
          View All
        </button>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png";

          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={posterUrl}
            />
          );
        })}
      </div>
    </section>
  );
}
