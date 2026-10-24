import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import { usePosterUrl } from "../../../../hooks/usePosterUrl";
import type { Film } from "../../../../types/Film";
import { getYear } from "../../../../utils/movie";

import styles from "./TrendingCard.module.scss";

interface Props {
    film: Film;
}

export const TrendingCard = ({ film }: Props) => {
    const year = getYear(film.release_date);
    const genres = film.genres.slice(0, 2).join(" / ");
    const posterUrl = usePosterUrl(film.poster_path);

    return (
        <Link
            to={`/movie/${film.id}`}
            className={styles.card}
        >
            <div className={styles.poster}>
                {posterUrl && (
                    <img
                        className={styles.image}
                        src={posterUrl}
                        alt={film.title}
                        loading="lazy"
                        draggable={false}
                    />
                )}
            </div>

            <div className={styles.info}>
                <h3 className={styles.name}>{film.title}</h3>
                <p className={styles.genres}>
                    {[year, genres].filter(Boolean).join(" • ")}
                </p>
                <span className={styles.rating}>
                    <Star
                        size={12}
                        fill="currentColor"
                    />
                    {film.vote_average.toFixed(1)}
                </span>
            </div>
        </Link>
    );
};
