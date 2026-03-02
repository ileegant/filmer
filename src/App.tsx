import { useEffect, useState } from "react";
import "./App.css";
import { fetchMovies } from "./api/tmdb";
import type { Movie } from "./types";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";

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
                <button className="group flex flex-1 items-center justify-center gap-2 bg-neutral-800 hover:bg-green-600/20 text-neutral-50 border border-neutral-700 hover:border-green-500/50 text-lg font-bold rounded-md cursor-pointer py-3">
                  <ThumbsUp className="group-hover:text-green-400 group-hover:fill-green-400 transition-colors" />
                  LIKE
                </button>
                <button className="group flex flex-1 items-center justify-center gap-2 bg-neutral-800 hover:bg-red-600/20 text-neutral-50 border border-neutral-700 hover:border-red-500/50 text-lg font-bold rounded-md cursor-pointer py-3">
                  <ThumbsDown className="group-hover:text-red-400 group-hover:fill-red-400 transition-colors" />
                  DISLIKE
                </button>
              </div>
              <button className="group flex items-center justify-center gap-2 w-full bg-neutral-50 hover:bg-amber-400 text-neutral-900 text-lg font-black rounded-md cursor-pointer py-3 transition-all">
                <Bookmark className="group-hover:fill-neutral-900" />
                ADD TO WATCH LIST
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
