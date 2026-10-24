import { useId } from "react";
import { Check, Play, Plus, Star } from "lucide-react";
import clsx from "clsx";

import { useWatchlist } from "../../../../contexts/useWatchlist";

import styles from "./FeaturedMovie.module.scss";

interface Props {
  movieId: number;
  title: string;
  description: string;
  genres: readonly string[];
  rating: number;
  trailerUrl?: string | null;
  backdropUrl?: string | null;
  onAddToWatchlist?: () => void;
  className?: string;
}

export const FeaturedMovie = ({
  movieId,
  title,
  description,
  genres,
  rating,
  trailerUrl,
  backdropUrl,
  onAddToWatchlist,
  className,
}: Props) => {
    const { movieIds, hasError, toggleMovie } = useWatchlist();
    const statusId = useId();
    const isAdded = movieIds.includes(movieId);

    const handleWatchlistToggle = () => {
        if (toggleMovie(movieId)) onAddToWatchlist?.();
    };

    return (
        <article
            className={clsx(styles.card, className)}
            style={
                backdropUrl ?
                    { backgroundImage: `url(${backdropUrl})` }
                :   undefined
            }
        >
            {backdropUrl && <div className={styles.overlay} aria-hidden="true" />}

            <div className={styles.content}>
                <span className={styles.badge}>
                    <Star
                        size={12}
                        fill="currentColor"
                    />
                    Trending
                </span>

                <h2 className={styles.title}>{title}</h2>

                <p className={styles.description}>{description}</p>

                <div className={styles.meta}>
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

                    <span className={clsx(styles.metaItem, styles.rating)}>
                        <Star
                            size={14}
                            fill="currentColor"
                        />
                        {rating.toFixed(1)}
                    </span>
                </div>

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
                        type="button"
                        className={styles.watchlistButton}
                        aria-pressed={isAdded}
                        aria-describedby={
                            hasError ? statusId : undefined
                        }
                        title={
                            hasError ?
                                "Could not access the watchlist. Your change was not saved."
                            :   undefined
                        }
                        onClick={handleWatchlistToggle}
                    >
                        {isAdded ? <Check size={16} /> : <Plus size={16} />}
                        {isAdded ? "In Watchlist" : "Watchlist"}
                    </button>
                    {hasError && (
                        <span
                            id={statusId}
                            role="status"
                            aria-live="polite"
                            style={{
                                position: "absolute",
                                width: 1,
                                height: 1,
                                padding: 0,
                                margin: -1,
                                overflow: "hidden",
                                clip: "rect(0, 0, 0, 0)",
                                whiteSpace: "nowrap",
                                border: 0,
                            }}
                        >
                            Could not access the watchlist. Your change was not saved.
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};
