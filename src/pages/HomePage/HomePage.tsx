import { Hero, HeroError, HeroSkeleton } from "./components/Hero";
import { TrendingSection } from "./components/TrendingSection";
import { useHeroMovie } from "./hooks/useHeroMovie";

import styles from "./HomePage.module.scss";

export const HomePage = () => {
    const { movie, backdropUrl, isLoading, error } = useHeroMovie();

    return (
        <div className={styles.page}>
            {isLoading && <HeroSkeleton />}

            {!isLoading && movie && (
                <Hero
                    id={movie.id}
                    title={movie.title}
                    description={movie.overview}
                    genres={movie.genres.map((genre) => genre.name)}
                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                    trailerUrl={movie.trailer_url}
                    imageUrl={backdropUrl}
                />
            )}

            {!isLoading && error && <HeroError />}

            <TrendingSection />
        </div>
    );
};
