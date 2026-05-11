"use client";

import { useState } from "react";

import GenreFilter from "./GenreFilter";

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
];

export default function GenresSection() {
  const [selectedGenre, setSelectedGenre] =
    useState<number | null>(null);

  return (
    <section className="px-6 py-8">
      <h2 className="mb-5 text-3xl font-bold text-white">
        Browse Genres
      </h2>

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />

      {selectedGenre && (
        <div className="mt-4 text-zinc-400">
          Selected Genre ID: {selectedGenre}
        </div>
      )}
    </section>
  );
}