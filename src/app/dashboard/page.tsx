import Navbar from "@/components/movies/Navbar";

import HeroBanner from "@/components/movies/HeroBanner";

import GenresSection from "@/components/movies/GenresSection";

import AIMovieAssistant from "@/components/movies/AIMovieAssistant";

import CinematicRow from "@/components/movies/CinematicRow";

import { tmdb, imageBaseUrl } from "@/lib/tmdb";

async function getMovies(endpoint: string) {
  const response = await tmdb.get(endpoint);

  return response.data.results;
}

export default async function DashboardPage() {
  const trendingMovies =
    await getMovies(
      "/trending/movie/week"
    );

  const topRatedMovies =
    await getMovies(
      "/movie/top_rated"
    );

  const popularMovies =
    await getMovies(
      "/movie/popular"
    );

  const upcomingMovies =
    await getMovies(
      "/movie/upcoming"
    );

  const heroMovie =
    trendingMovies[0];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <HeroBanner
        id={heroMovie.id}
        title={heroMovie.title}
        overview={heroMovie.overview}
        image={`${imageBaseUrl}${heroMovie.backdrop_path}`}
      />

      <GenresSection />

      <CinematicRow
        title="Trending Now"
        movies={trendingMovies}
      />

      <CinematicRow
        title="Top Rated"
        movies={topRatedMovies}
      />

      <CinematicRow
        title="Popular Movies"
        movies={popularMovies}
      />

      <CinematicRow
        title="Upcoming Releases"
        movies={upcomingMovies}
      />

      <AIMovieAssistant />
    </main>
  );
}