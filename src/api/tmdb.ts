const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface FetchFilters {
  genreId?: number;
  minRating?: number;
  year?: number;
}

export const fetchMovies = async (
  page: number = 1,
  filters: FetchFilters = {}
) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "uk-UA",
    sort_by: "popularity.desc",
    include_adult: "false",
    page: page.toString(),
  });

  if (filters.genreId) {
    params.append("with_genres", filters.genreId.toString());
  }
  if (filters.minRating) {
    params.append("vote_average.gte", filters.minRating.toString());
  }
  if (filters.year) {
    params.append("primary_release_year", filters.year.toString());
  }

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?${params.toString()}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || "API Error");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
