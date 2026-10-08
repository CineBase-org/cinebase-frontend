import { useState } from "react";
import { FeaturedMovie, FeaturedMovieSkeleton } from "./components/FeaturedMovie";
import { GenreFilter } from "./components/GenreFilter";
import { useFeaturedMovie } from "./hooks/useFeaturedMovie";

import styles from "./CatalogPage.module.scss";

const GENRES = [
    "All",
    "Sci-Fi",
    "Action",
    "Drama",
    "Adventure",
    "Mystery",
] as const;

export const CatalogPage = () => {
    const [activeGenre, setActiveGenre] = useState<string>(GENRES[0]);
    const { movie, backdropUrl, isLoading, error } = useFeaturedMovie();

    return (
        <section className={styles.catalog}>
            {isLoading && <FeaturedMovieSkeleton className={styles.featured} />}

            {!isLoading && movie && (
                <FeaturedMovie
                    className={styles.featured}
                    title={movie.title}
                    description={movie.overview}
                    genres={movie.genres.map((genre) => genre.name)}
                    rating={movie.vote_average}
                    trailerUrl={movie.trailer_url}
                    backdropUrl={backdropUrl}
                />
            )}

            {!isLoading && error && (
                <p className={styles.featuredError}>
                    Couldn&apos;t load the trending movie right now.
                </p>
            )}

            <h1 className={styles.title}>All Movies &amp; TV Shows</h1>

            <GenreFilter
                className={styles.filter}
                genres={GENRES}
                activeGenre={activeGenre}
                onGenreChange={setActiveGenre}
            />
        </section>
    );
};
