import { Play, Plus, Star } from "lucide-react";
import clsx from "clsx";

import styles from "./FeaturedMovie.module.scss";

interface Props {
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
    title,
    description,
    genres,
    rating,
    trailerUrl,
    backdropUrl,
    onAddToWatchlist,
    className,
}: Props) => {
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
                        className={styles.watchlistButton}
                        onClick={onAddToWatchlist}
                    >
                        <Plus size={16} />
                        Watchlist
                    </button>
                </div>
            </div>
        </article>
    );
};
