import clsx from "clsx";

import styles from "./GenreFilter.module.scss";

interface Props {
    genres: readonly string[];
    activeGenres: string[];
    onGenreChange: (genre: string) => void;
    className?: string;
}

export const GenreFilter = ({
    genres,
    activeGenres,
    onGenreChange,
    className,
}: Props) => {
    return (
        <ul
            className={clsx(styles.list, className)}
            aria-label="Filter by genre"
        >
            {genres.map((genre) => {
                const isActive = activeGenres.includes(genre);

                return (
                    <li
                        key={genre}
                        className={styles.item}
                    >
                        <button
                            className={clsx(styles.chip, isActive && styles.active)}
                            onClick={() => onGenreChange(genre)}
                            aria-pressed={isActive}
                        >
                            {genre}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
