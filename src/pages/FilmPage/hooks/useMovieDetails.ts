import { useEffect, useState } from "react";
import { getMovieById, type MovieDetail } from "../../../api/movies";

interface State {
  movie: MovieDetail | null;
  isLoading: boolean;
  error: boolean;
}

export const useMovieDetails = (id: number) => {
  const [state, setState] = useState<State>({
    movie: null,
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    let isCancelled = false;

    getMovieById(id)
      .then((movie) => {
        if(!isCancelled) {
          setState({
            movie, 
            isLoading: false, 
            error: false,
          });
        }
      })

    .catch(() => {
      if(!isCancelled) {
        setState({
          movie: null,
          isLoading: false,
          error: true,
        });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return state;
}