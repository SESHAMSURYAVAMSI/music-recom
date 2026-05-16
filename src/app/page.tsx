"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Play, Sparkles, ArrowRight } from "lucide-react";

const posters = [
  "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  "https://image.tmdb.org/t/p/w500/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
  "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
  "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  "https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
];

export default function Home() {
  const router = useRouter();

  function handleNavigate() {
    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-3xl" />

        {/* Auto Scrolling Posters */}
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 flex gap-8 opacity-20"
        >
          {[...posters, ...posters].map((poster, index) => (
            <div key={index} className="mt-8">
              <Image
                src={poster}
                alt="Movie Poster"
                width={320}
                height={480}
                className="rounded-[30px] shadow-2xl shadow-black/70"
              />
            </div>
          ))}
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-black/80 to-[#050816]/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/20" />
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-violet-600 p-3 shadow-lg shadow-violet-500/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-3xl font-black tracking-tight">CineVerse</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/60"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>

          <Button
            onClick={handleNavigate}
            className="rounded-full bg-violet-600 px-6 hover:bg-violet-700"
          >
            Explore
          </Button>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 flex min-h-[88vh] items-center px-6 md:px-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300 backdrop-blur-xl">
              🎬 AI Powered Movie Platform
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Discover Movies
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
              Explore trending movies, AI-powered recommendations, cinematic
              trailers, favorites, watchlists, and immersive experiences in one
              powerful platform.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              <Button
                size="lg"
                onClick={handleNavigate}
                className="rounded-full bg-violet-600 px-8 py-7 text-lg font-semibold hover:bg-violet-700"
              >
                <Play className="mr-2 h-5 w-5 fill-white" />
                Start Watching
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/login")}
                className="rounded-full border-white/20 bg-white/5 px-8 py-7 text-lg text-white backdrop-blur-xl hover:bg-white/60"
              >
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap gap-10">
              <div>
                <h3 className="text-3xl font-bold text-violet-400">10K+</h3>

                <p className="text-zinc-400">Movies</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-pink-400">AI</h3>

                <p className="text-zinc-400">Recommendations</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-cyan-400">HD</h3>

                <p className="text-zinc-400">Trailers</p>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative hidden justify-center lg:flex"
          >
            {/* Glow */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl" />

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 shadow-2xl shadow-black/60">
              <Image
                src="https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
                alt="Featured Movie"
                width={500}
                height={700}
                className="h-[550px] w-[470px] object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
