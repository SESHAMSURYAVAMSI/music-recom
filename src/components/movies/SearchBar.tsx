"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(
      `/search?query=${encodeURIComponent(query)}`
    );
  };

  return (
    <div className="flex w-full items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
      <Search className="text-zinc-400" />

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" && handleSearch()
        }
        className="ml-3 w-full bg-transparent text-white outline-none"
      />
    </div>
  );
}