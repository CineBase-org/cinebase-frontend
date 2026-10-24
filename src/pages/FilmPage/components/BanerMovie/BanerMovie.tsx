import clsx from 'clsx';
import styles from './BanerMovie.module.scss';
import { Play, Plus, Share, Star } from 'lucide-react';
import { useState } from 'react';

type Props = {
  title: string;
  genres: string[];
  date: string;
  runtime: string;
  description: string;
  trailerUrl?: string | null;
  backdropUrl?: string | null;
  onAddToWatchlist?: () => void;
  className?: string;
}

export const BanerMovie = ({
  title,
  genres,
  date,
  runtime,
  description,
  trailerUrl,
  onAddToWatchlist,
  className,
}: Props) => {
  const [shareMessage, setShareMessage] = useState('');
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied!')
    } catch (error) {
      console.error('Failed to copy the link:', error);
      setShareMessage('Failed to copy link');
    }

    setTimeout(() => {
      setShareMessage('');
    }, 2000);
  };

  return (
    <article className={clsx(styles.card, className)}>
  
    <div className={styles.content}>
      <span className={styles.badge}>
        <Star
            size={12}
            fill="currentColor"
        />
        Trending
        </span>

        <h2 className={styles.title}>{title}</h2>
        <div className={styles.options}>
          <span className={styles.date}>{date.slice(0, 4)}</span>
          <span className={styles.dot} aria-hidden="true" />
          {genres.map((genre, index) => (
            <span
              key={genre}
              className={styles.metaItem}
            >
              {index > 0 && (
                <span
                  className={styles.dot}
                  aria-hidden="true"
                />
            )}
            {genre}
            </span>
          ))}
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.runtime}>{runtime}</span>
        </div>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <a
              className={clsx(
                  styles.trailerButton,
                  !trailerUrl && styles.disabled,
              )}
              href={trailerUrl ?? undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!trailerUrl}
              onClick={(e) => {
                  if (!trailerUrl) e.preventDefault();
              }}
          >
              <Play
                  size={16}
                  fill="currentColor"
              />
              Watch Trailer
          </a>

          <button
              className={styles.watchlistButton}
              onClick={onAddToWatchlist}
          >
              <Plus size={16} />
              Watchlist
          </button>

          <button
              className={styles.shareButton}
              onClick={handleShare}
          >
              <Share size={16} />
              Share
          </button>
          {shareMessage && (
            <span role="status" aria-live="polite">
              {shareMessage}
            </span>
          )}
      </div>
    </div>
    </article>
  );
};