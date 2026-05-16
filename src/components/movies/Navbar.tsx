"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Heart, Bookmark, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");

      toast.success("Logged out successfully");

      router.push("/login");

      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/dashboard" className="text-3xl font-bold text-white">
          CineVerse
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/recommendations"
            className="text-sm text-zinc-300 transition hover:text-white"
          >
            AI Picks
          </Link>

          <Link
            href="/favorites"
            className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white hover:text-black"
          >
            <Heart size={18} />
          </Link>

          <Link
            href="/watchlist"
            className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white hover:text-black"
          >
            <Bookmark size={18} />
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-full bg-red-500/20 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
