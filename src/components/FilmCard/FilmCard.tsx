
import { Play, Plus, Share2, Star } from 'lucide-react';
import styles from './FilmCard.module.scss';
import type { Film } from '../../types/Film';

type FilmCardProps = {
  film: Film;
};

export const FilmCard = ({ film }: FilmCardProps) => {
  return (
    <article className={styles.film}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
          alt={film.title}
          loading="lazy"
        />

        <a
          className={styles.playButton}
          href={film.trailer_url ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${film.title} trailer`}
        >
          <Play
            className={styles.playIcon}
            size={16}
            fill="currentColor"
          />
        </a>
      </div>

      <h3 className={styles.film__name}>{film.title}</h3>

      <div className={styles.filmDetails}>
        <div className={styles.filmMeta}>
          <p className={styles.film__date}>
            {film.release_date?.slice(0, 4) ?? ''}
          </p>

          <p className={styles.film__genres}>
            {film.genres.slice(0, 2).join(', ')}
          </p>
        </div>

        <span className={styles.rating}>
          <Star size={14} fill="currentColor" />
          {film.vote_average.toFixed(1)}
        </span>
      </div>

      <div className={styles.desktopOverlay}>
        <div className={styles.overlayContent}>
          <button
            type="button"
            className={styles.openButton}
          >
            Open
          </button>

          <div className={styles.overlayActions}>
            <button
              type="button"
              className={styles.overlayButton}
            >
              <Plus size={14} />
              <span>Watchlist</span>
            </button>

            <button
              type="button"
              className={styles.overlayButton}
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
