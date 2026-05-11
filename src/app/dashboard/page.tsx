import Navbar from "@/components/movies/Navbar";

import HeroBanner from "@/components/movies/HeroBanner";

import MovieRow from "@/components/movies/MovieRow";
import GenresSection from "@/components/movies/GenresSection";
import AIMovieAssistant from "@/components/movies/AIMovieAssistant";

import { tmdb, imageBaseUrl } from "@/lib/tmdb";

async function getTrendingMovies() {
  const response = await tmdb.get(
    "/trending/movie/week"
  );

  return response.data.results;
}

export default async function DashboardPage() {
  const movies = await getTrendingMovies();

  const heroMovie = movies[0];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <HeroBanner
        title={heroMovie.title}
        overview={heroMovie.overview}
        image={`${imageBaseUrl}${heroMovie.backdrop_path}`}
      />

      <GenresSection />

      <MovieRow
        title="Trending Movies"
        movies={movies}
      />

      <AIMovieAssistant />
    </main>
  );
}