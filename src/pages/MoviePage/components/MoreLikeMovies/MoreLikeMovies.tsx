import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './MoreLikeMovie.module.scss';
import { useRef } from 'react';
import type { MovieListItem } from '../../../../api/movies';
import { MoreLikeMoviesCard } from './components/MoreLIkeMoviesCard';

type Props = {
  movies: MovieListItem[];
};


export const MoreLikeMovies = ({ movies }: Props) => {
  const moviesListRef = useRef<HTMLDivElement>(null);

  const scrollMovies = (direction: number) => {
    moviesListRef.current?.scrollBy({
      left: direction * 200,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.moreLikeMoviesContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>More Like This</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous actors"
            onClick={() => scrollMovies(-1)}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            className={styles.arrow}
            aria-label="Next actors"
            onClick={() => scrollMovies(1)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        className={styles.moviesList}
        ref={moviesListRef}
      >
        {movies.map((movie) => (
          <MoreLikeMoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};