import { useEffect, useState } from "react";
import "./App.css";
import { fetchMovies } from "./api/tmdb";
import type { Movie } from "./types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies(1).then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 p-10">
      {movies.map((movie) => (
        <>
          <div className="flex flex-col gap-4 w-180 bg-neutral-900 text-neutral-50 p-4 rounded-xl">
            <div className="flex gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "200px", borderRadius: "10px" }}
              />
              <div>
                <h3 className="uppercase font-bold text-3xl">
                  {movie.title}
                  <span className="bg-amber-400 px-2 text-lg rounded-sm text-neutral-900 ml-2">
                    {movie.vote_average}
                  </span>
                </h3>
                <h5 className="text-sm py-4">{movie.release_date}</h5>
                <h5 className="text-sm">{movie.overview}</h5>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex w-full gap-4">
                <button className="flex-1 bg-neutral-50 text-neutral-900 text-lg font-bold rounded-md cursor-pointer p-2">
                  LIKE
                </button>
                <button className="flex-1 bg-neutral-50 text-neutral-900 text-lg font-bold rounded-md cursor-pointer p-2">
                  DISLIKE
                </button>
              </div>
              <button className="w-full text-neutral-50 border-2 border-neutral-50 text-lg font-bold rounded-md cursor-pointer p-2">
                WATCH LATER
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
