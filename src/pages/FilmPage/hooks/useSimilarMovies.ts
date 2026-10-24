import { useEffect, useState } from 'react';
import {
  getMovies,
  type MovieListItem,
  type MovieDetail,
} from '../../../api/movies';

export const useSimilarMovies = (movie: MovieDetail | null) => {
  const [movies, setMovies] = useState<MovieListItem[]>([]);

  useEffect(() => {
    if (!movie) {
      return;
    }

    let isCancelled = false;

    const loadSimilarMovies = async () => {
      try {
        const firstPage = await getMovies({ page: 1 });
        const pageSize = firstPage.results.length;

        if (pageSize === 0) {
          if (!isCancelled) {
            setMovies([]);
          }

          return;
        }

        const totalPages = Math.ceil(firstPage.count / pageSize);
        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        const { results } =
          randomPage === 1
            ? firstPage
            : await getMovies({ page: randomPage });

        const similarMovies = results
          .filter((item) => item.id !== movie.id)
          .filter((item) =>
            item.genres.some((genre) =>
              movie.genres.some((g) => g.name === genre),
            ),
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        if (!isCancelled) {
          setMovies(similarMovies);
        }
      } catch {
        if (!isCancelled) {
          setMovies([]);
        }
      }
    };

    loadSimilarMovies();

    return () => {
      isCancelled = true;
    };
  }, [movie]);

  return movies;
};
