
import { useEffect, useState } from "react";
import { getMovies, type MovieListItem } from "../../../api/movies";

interface State {
  films: MovieListItem[];
  isLoading: boolean;
  error: boolean;
  totalCount: number;
}

export const useFilms = (page: number, genreId: number | null) => {
  const [state, setState] = useState<State>({
    films: [],
    isLoading: true,
    error: false,
    totalCount: 0,
  });

  useEffect(() => {
    let isCancelled = false;

    getMovies({ 
      page,
      genres: genreId === null ? undefined : String(genreId),
    })
      .then((response) => {
        if (!isCancelled) {
          setState({
            films: response.results,
            isLoading: false,
            error: false,
            totalCount: response.count,
          });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setState({
            films: [],
            isLoading: false,
            error: true,
            totalCount: 0,
          });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [page, genreId]);

  return state;
};
