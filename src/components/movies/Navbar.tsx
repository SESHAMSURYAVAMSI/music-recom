"use client";

import Link from "next/link";

import { Search, Heart, Bookmark , LogOut} from "lucide-react";

import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/dashboard"
          className="text-3xl font-bold text-white"
        >
          CineVerse
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/recommendations"
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            AI Picks
          </Link>

          <Link
            href="/favorites"
            className="rounded-full bg-white/10 p-3 text-white"
          >
            <Heart size={18} />
          </Link>

          <Link
            href="/watchlist"
            className="rounded-full bg-white/10 p-3 text-white"
          >
            <Bookmark size={18} />
          </Link>

          
        </div>
      </div>
    </nav>
  );
}