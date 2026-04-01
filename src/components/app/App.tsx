import { useState, useEffect } from "react";
import css from "./App.module.css";
import moviesApi from "../../services/servicesApi.ts";
import type { Movie } from "../../types/movie.ts";
import SearchBar from "../searchBar/SearchBar.tsx";
import MovieGrid from "../movieGrid/MovieGrid.tsx";
import Loader from "../loader/Loader.tsx";
import ErrorMessage from "../errorMessage/ErrorMessage.tsx";
import MovieModal from "../movieModal/MovieModal.tsx";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleClickMovie = (id: number): void => {
    const selectedMovie = movies.find(movie => movie.id === id);

    if (!selectedMovie) {
      setIsError(true);
      console.error("Movie not found");
      return;
    }

    setMovie(selectedMovie);
    openModal();
  };


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
      {!isError ? <MovieGrid movies={movies} onSelect={handleClickMovie} /> : <ErrorMessage />}
      {isLoading && <Loader />}
      {isModalOpen && movie && <MovieModal onClose={closeModal} movie={movie} />}
    </div>
  );
}

export default App;