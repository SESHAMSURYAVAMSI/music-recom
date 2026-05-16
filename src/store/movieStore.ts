import { create } from "zustand";

interface MovieStore {
  favorites: number[];

  watchlist: number[];

  addFavorite: (id: number) => void;

  removeFavorite: (id: number) => void;

  addWatchlist: (id: number) => void;

  removeWatchlist: (id: number) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  favorites: [],

  watchlist: [],

  addFavorite: (id) =>
    set((state) => ({
      favorites: [...state.favorites, id],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((movieId) => movieId !== id),
    })),

  addWatchlist: (id) =>
    set((state) => ({
      watchlist: [...state.watchlist, id],
    })),

  removeWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter((movieId) => movieId !== id),
    })),
}));
