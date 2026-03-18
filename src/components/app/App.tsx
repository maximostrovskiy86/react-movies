import { useState, useEffect } from "react";
import css from "./App.module.css";
import SearchBar from "../searchBar/SearchBar.tsx";
import MovieGrid from "../movieGrid/MovieGrid.tsx";
import Loader from "../loader/Loader.tsx";
import moviesApi from "../../services/servicesApi.ts";
import type { Movie } from '../../types/movie.ts';



function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await moviesApi.fetchGetMediaTrending();
        setMovies(data);
      } catch(error) {
        console.error("Error loading movies:", error);
      }
    }

    void fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <SearchBar />
      <MovieGrid movies={movies}/>
      <Loader />
    </div>
  );
}

export default App;