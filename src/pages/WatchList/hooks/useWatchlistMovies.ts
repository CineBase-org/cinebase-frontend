import { useQueries } from "@tanstack/react-query"
import { getMovieById, type MovieListItem } from "../../../api/movies"

export const useWatchlistMovies = (moviesId: number[]) => {
  const queries = useQueries({
    queries: moviesId.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => getMovieById(id),
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.some((q) => q.isError);

  const films: MovieListItem[] = queries
    .map((q) => q.data)
    .filter((movie) => movie !== undefined)
    .map((movie) => ({
      id: movie!.id,
      title: movie!.title,
      genres: movie!.genres.map((g) => g.name),
      release_date: movie!.release_date,
      vote_average: movie!.vote_average,
      poster_path: movie!.poster_path,
      trailer_url: movie!.trailer_url,
    }));

    return { films, isLoading, error };
};