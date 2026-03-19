import { useState, useEffect } from "react";
import css from "./App.module.css";
import SearchBar from "../searchBar/SearchBar.tsx";
import MovieGrid from "../movieGrid/MovieGrid.tsx";
import Loader from "../loader/Loader.tsx";
import moviesApi from "../../services/servicesApi.ts";
import type { Movie } from "../../types/movie.ts";
import ErrorMessage from "../errorMessage/ErrorMessage.tsx";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await moviesApi.fetchGetMediaTrending();
        setIsLoading(false);
        setMovies(data);
      } catch (error) {
        setIsError(true);
        console.error("Error loading movies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchMovies();
  }, []);


  const handleSearch = async (query: string) => {
    if (query.trim() !== "") {
      try {
        setIsError(false);
        const searchResultsMovies = await moviesApi.fetchGetMediaSearch(query);
        setMovies(searchResultsMovies);
      } catch (error) {
        setIsError(true);
        console.log("Error fetching movies: ", error);
      }
    }
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {!isError ? <MovieGrid movies={movies} /> : <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;