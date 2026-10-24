import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import { AddButton, PlayButton } from "../../../../components/Button";
import { getYear } from "../../../../utils/movie";

import styles from "./Hero.module.scss";

interface Props {
    id: number;
    title: string;
    description: string;
    genres: readonly string[];
    rating: number;
    releaseDate: string | null;
    trailerUrl?: string | null;
    /** Picture shown on the right on tablet and up. */
    imageUrl?: string | null;
}

export const Hero = ({
    id,
    title,
    description,
    genres,
    rating,
    releaseDate,
    trailerUrl,
    imageUrl,
}: Props) => {
    const year = getYear(releaseDate);
    const genreText = genres.slice(0, 2).join(" / ");

    // "★ 8.6 / 10 • 2024 • Sci-Fi / Action"
    const metaInline = [`★ ${rating.toFixed(1)} / 10`, year, genreText]
        .filter(Boolean)
        .join(" • ");

    // "Sci-Fi • Drama • ★ 8.7" (mobile layout)
    const metaBelow = [...genres.slice(0, 2), `★ ${rating.toFixed(1)}`].join(
        " • ",
    );

    return (
        <section
            className={styles.hero}
            aria-label={`Featured: ${title}`}
        >
            <div className={styles.content}>
                <div className={styles.topRow}>
                    <span className={styles.badge}>
                        <Star
                            className={styles.badgeStar}
                            size={12}
                            fill="currentColor"
                            aria-hidden="true"
                        />
                        <span
                            className={styles.badgeHash}
                            aria-hidden="true"
                        >
                            #
                        </span>
                        Featured
                    </span>
                    <p className={styles.metaInline}>{metaInline}</p>
                </div>

                <h1 className={styles.title}>
                    <Link
                        to={`/movie/${id}`}
                        className={styles.titleLink}
                    >
                        {title}
                    </Link>
                </h1>

                <p className={styles.description}>{description}</p>
                <p className={styles.metaBelow}>{metaBelow}</p>

                <div className={styles.actions}>
                    <PlayButton
                        trailerUrl={trailerUrl}
                        label="Watch Trailer"
                    />
                    <AddButton movieId={id} />
                </div>
            </div>

            {imageUrl && (
                <img
                    className={styles.image}
                    src={imageUrl}
                    alt=""
                />
            )}
        </section>
    );
};

export const HeroSkeleton = () => (
    <div
        className={styles.skeleton}
        role="status"
        aria-label="Loading featured movie"
    />
);

export const HeroError = () => (
    <p className={styles.error}>Couldn't load the featured movie right now.</p>
);
