// import axios from "axios";

// const API_KEY =
//   process.env.NEXT_PUBLIC_TMDB_API_KEY;

// const BASE_URL =
//   "https://api.themoviedb.org/3";

// export const tmdb = axios.create({
//   baseURL: BASE_URL,
//   params: {
//     api_key: API_KEY,
//   },
// });

// export const imageBaseUrl =
//   "https://image.tmdb.org/t/p/original";

import axios from "axios";

const ACCESS_TOKEN =
  process.env.TMDB_ACCESS_TOKEN;

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export const imageBaseUrl =
  "https://image.tmdb.org/t/p/original";