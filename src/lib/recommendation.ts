interface Movie {
  id: number;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
}

export function recommendMovies(
  movies: Movie[],
  preferredGenres: number[]
) {
  return movies
    .map((movie) => {
      const genreMatch =
        movie.genre_ids.filter((id) =>
          preferredGenres.includes(id)
        ).length;

      const score =
        genreMatch * 5 +
        movie.vote_average * 2 +
        movie.popularity * 0.01;

      return {
        ...movie,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);
}