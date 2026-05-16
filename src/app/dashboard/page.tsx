import Navbar from "@/components/movies/Navbar";
import HeroBanner from "@/components/movies/HeroBanner";
import GenresSection from "@/components/movies/GenresSection";
import AIMovieAssistant from "@/components/movies/AIMovieAssistant";
import CinematicRow from "@/components/movies/CinematicRow";
import { tmdb } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

async function getMovies(endpoint: string) {
  try {
    const response = await tmdb.get(endpoint);

    return response.data.results;
  } catch (error) {
    console.log(
      `Failed to fetch ${endpoint}`,
      error
    );

    return [];
  }
}

export default async function DashboardPage() {
  const trendingMovies = await getMovies(
    "/trending/movie/week"
  );

  const topRatedMovies = await getMovies(
    "/movie/top_rated"
  );

  const popularMovies = await getMovies(
    "/movie/popular"
  );

  const upcomingMovies = await getMovies(
    "/movie/upcoming"
  );

  const nowPlayingMovies = await getMovies(
    "/movie/now_playing"
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute left-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-red-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      {trendingMovies.length > 0 && (
        <HeroBanner
          movies={trendingMovies.slice(
            0,
            5
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Genres */}
        <section className="relative z-20 -mt-24">
          <GenresSection />
        </section>

        {/* Movie Sections */}
        <div className="space-y-6 pb-20">
          {trendingMovies.length >
            0 && (
            <CinematicRow
              title="🔥 Trending Now"
              movies={
                trendingMovies
              }
            />
          )}

          {topRatedMovies.length >
            0 && (
            <CinematicRow
              title="⭐ Top Rated"
              movies={
                topRatedMovies
              }
            />
          )}

          {popularMovies.length >
            0 && (
            <CinematicRow
              title="🎬 Popular Movies"
              movies={
                popularMovies
              }
            />
          )}

          {upcomingMovies.length >
            0 && (
            <CinematicRow
              title="🚀 Upcoming Releases"
              movies={
                upcomingMovies
              }
            />
          )}

          {nowPlayingMovies.length >
            0 && (
            <CinematicRow
              title="🍿 Now Playing"
              movies={
                nowPlayingMovies
              }
            />
          )}
        </div>

        {/* AI Assistant */}
        <section className="relative px-6 pb-20">
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-red-500/10 to-purple-500/10 blur-3xl" />

          <div className="relative">
            <AIMovieAssistant />
          </div>
        </section>

        {/* Copyright Footer */}
        <footer className="border-t border-white/10 py-6">
          <div className="text-center text-sm text-zinc-500">
            © 2026 CineVerse.
            All rights reserved by
            Surya Vamsi S.
          </div>
        </footer>
      </div>
    </main>
  );
}