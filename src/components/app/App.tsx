import "./App.module.css";
import SearchBar from "../searchBar/SearchBar.tsx";
import MovieGrid from "../movieGrid/MovieGrid.tsx";
import Loader from "../loader/Loader.tsx";

function App() {

  return (
    <>
      <SearchBar />
      <MovieGrid />
      <Loader/>
    </>
  );
}

export default App;
