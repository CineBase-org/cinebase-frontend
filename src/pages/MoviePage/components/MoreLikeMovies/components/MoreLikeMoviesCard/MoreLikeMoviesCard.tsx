import { useNavigate } from 'react-router-dom';
import type { MovieListItem } from '../../../../../../api/movies';
import styles from './MoreLikeMoviesCard.module.scss';
import { Star } from 'lucide-react';

type Props = {
  movie: MovieListItem;
};

export const MoreLikeMoviesCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  return (
    <article 
      className={styles.movieCard}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        className={styles.poster}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : undefined
        }
        alt={movie.title}
        loading="lazy"
      />
        <div className={styles.details}>
          <h3 className={styles.title}>{movie.title}</h3>

          <p className={styles.meta}>
            {movie.release_date?.slice(0, 4) ?? ''}
            {movie.genres.length > 0 && ' · '}
            {movie.genres.slice(0, 2).join(' / ')}
          </p>

          <span className={styles.rating}>
            <Star size={13} fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
    </article>
  );
};