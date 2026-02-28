import { useEffect, useState } from "react";
import "./App.css";
import { fetchMovies } from "./api/tmdb";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(1).then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <>
      {movies.map((i) => (
        <>
          <h1>Movie {i.title}</h1>
          <div>{JSON.stringify(i)}</div>
        </>
      ))}
    </>
  );
}

export default App;
