import axios from "axios";

// const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const BASE_FETCH_URL = "https://api.themoviedb.org/3";
import type { Movie } from "../types/movie.ts";

interface TrendingMoviesResponse {
  results: Movie[];
}


const fetchGetMediaTrending = async (): Promise<Movie[]> => {
  const response = await axios
    .get<TrendingMoviesResponse>(`${BASE_FETCH_URL}/trending/movie/day`, {
    headers: {
      Accept: "application/json",
      Authorization:
        // `Bearer ${API_TOKEN}`
          `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMwOTAyNWI0YTUwMDMwN2FlMjZjODkzZjM5YzMzNyIsIm5iZiI6MTY2NzQ5NDE1OC45NDEsInN1YiI6IjYzNjNmMTBlMDkxZTYyMDA3YTFhZWE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H7CY8-fTgSzUi_fcDU8sDdcVzFHfcFVAyfteGj8Ndns`

    }
  });

  console.log("response", response);

  return response.data.results;
};

// const fetchGetMediaTrending = async () => {
//     const response = await axios
//       .get(`${BASE_FETCH_URL}/trending/movie/day?&api_key=${API_KEY}`)
//     return response.data;
// }

// const fetchGetMediaSearch = async (query) => {
//   const response = await axios
//     .get(`${BASE_FETCH_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
//   return response.data;
// };
//
// const getMediaMovieDetails = async (movieId) => {
//   const response = await axios
//     .get(`${BASE_FETCH_URL}/movie/${movieId}?api_key=${API_KEY}`);
//   return response.data;
// };
//
// const getMediaMovieCast = async (movieId) => {
//   const response = await axios
//     .get(`${BASE_FETCH_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
//   return response.data;
// };
//
// const getMediaMovieReviews = async (movieId) => {
//   const response = await axios
//     .get(`${BASE_FETCH_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
//   return response.data;
// };

export default {
  fetchGetMediaTrending
  // fetchGetMediaSearch,
  // getMediaMovieDetails,
  // getMediaMovieCast,
  // getMediaMovieReviews
};