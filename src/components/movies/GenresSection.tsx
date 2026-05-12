"use client";

import { useState } from "react";

import axios from "axios";

import GenreFilter from "./GenreFilter";

import CinematicRow from "./CinematicRow";

interface Movie {
  id: number;

  title: string;

  poster_path: string;
}

const genres = [
  {
    id: 28,
    name: "Action",
    count: "12.5K",
  },
  {
    id: 35,
    name: "Comedy",
    count: "9.2K",
  },
  {
    id: 18,
    name: "Drama",
    count: "15.8K",
  },
  {
    id: 27,
    name: "Horror",
    count: "4.1K",
  },
  {
    id: 10749,
    name: "Romance",
    count: "6.7K",
  },
  {
    id: 878,
    name: "Sci-Fi",
    count: "3.9K",
  },
];

export default function GenresSection() {
  const [selectedGenre, setSelectedGenre] =
    useState<number | null>(null);

  const [movies, setMovies] =
    useState<Movie[]>([]);

  const [loading, setLoading] =
    useState(false);

  const handleSelectGenre =
    async (
      genreId: number | null
    ) => {
      setSelectedGenre(genreId);

      if (!genreId) {
        setMovies([]);

        return;
      }

      try {
        setLoading(true);

        const response =
          await axios.get(
            `/api/movies/by-genre?genreId=${genreId}`
          );

        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const selectedGenreName =
    genres.find(
      (genre) =>
        genre.id === selectedGenre
    )?.name;

  return (
    <section className="px-6 py-8">
      <h2 className="mb-5 text-3xl font-bold text-white">
        Browse Genres
      </h2>

      <GenreFilter
        genres={genres}
        selectedGenre={
          selectedGenre
        }
        onSelect={
          handleSelectGenre
        }
      />

      {loading && (
        <div className="mt-6 text-zinc-400">
          Loading movies...
        </div>
      )}

      {movies.length > 0 && (
        <div className="mt-10">
          <CinematicRow
            title={`${selectedGenreName} Movies`}
            movies={movies}
          />
        </div>
      )}
    </section>
  );
}