import MovieRow from "@/components/movies/MovieRow";
import SearchBar from "@/components/movies/SearchBar";
import { tmdb } from "@/lib/tmdb";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

async function searchMovies(query: string) {
  const response = await tmdb.get("/search/movie", {
    params: {
      query,
    },
  });

  return response.data.results;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const query = params.query || "";

  const movies = query ? await searchMovies(query) : [];

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="mb-10">
        <SearchBar />
      </div>

      {query ? (
        <MovieRow title={`Results for "${query}"`} movies={movies} />
      ) : (
        <p className="text-zinc-400">Search for movies</p>
      )}
    </main>
  );
}
