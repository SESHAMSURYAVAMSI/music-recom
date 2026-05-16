import MovieRow from "@/components/movies/MovieRow";
import MoodSelector from "@/components/movies/MoodSelector";
import { tmdb } from "@/lib/tmdb";
import { getMoodGenres } from "@/lib/aiRecommendations";

interface RecommendationPageProps {
  searchParams: Promise<{
    mood?: string;
  }>;
}

async function getMoviesByGenre(genreId: number) {
  const response = await tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
    },
  });

  return response.data.results;
}

export default async function RecommendationPage({
  searchParams,
}: RecommendationPageProps) {
  const params = await searchParams;

  const mood = params.mood || "";

  const genres = getMoodGenres(mood);

  let movies: any[] = [];

  if (genres.length > 0) {
    const results = await Promise.all(
      genres.map((genreId) => getMoviesByGenre(genreId)),
    );

    movies = results.flat();
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <h1 className="mb-8 text-5xl font-bold text-white">
        AI Movie Recommendations
      </h1>

      <MoodSelector />

      {mood ? (
        <div className="mt-10">
          <MovieRow title={`Because you're feeling ${mood}`} movies={movies} />
        </div>
      ) : (
        <div className="mt-10 text-zinc-400">
          Select a mood to get AI-powered movie recommendations.
        </div>
      )}
    </main>
  );
}
