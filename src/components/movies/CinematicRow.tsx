"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface CinematicRowProps {
  title: string;
  movies: Movie[];
}

export default function CinematicRow({
  title,
  movies,
}: CinematicRowProps) {
  return (
    <section className="px-6 py-10">
      <h2 className="mb-6 text-3xl font-bold text-white">
        {title}
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}