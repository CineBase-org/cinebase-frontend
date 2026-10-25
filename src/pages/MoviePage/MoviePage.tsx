
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { AddButton, PlayButton, ShareButton } from "../../components/Button";
import { formatRuntime, getYear } from "../../utils/movie";
import { getBackdropUrl } from "../../api/images";

import { AvailableOn, type Platform } from "./components/AvailableOn";
import { RatingSection } from "./components/RatingSection";
import { useMovie } from "./hooks/useMovie";

import styles from "./MoviePage.module.scss";
import { useSimilarMovies } from "../MoviePage/hooks/useSimilarMovies";
import { MoreLikeMovies } from "./components/MoreLikeMovies";
import { CastCrewMovie } from "./components/Cast&CrewMovie";

// Replace with real data once the backend exposes streaming providers.
const AVAILABLE_ON: readonly Platform[] = [
    { name: "Netflix", short: "N" },
    { name: "HBO Max", short: "HBO max" },
    { name: "Prime Video", short: "prime video" },
    { name: "Apple TV+", short: "tv+" },
];

const BackLink = () => (
    <Link to="/catalog" className={styles.back}>
        <ArrowLeft size={12} />
        Back to Catalog
    </Link>
);

export const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);
    

    const { movie, isLoading, error } = useMovie(movieId);
    const similarMovies = useSimilarMovies(movie);

    const [backdropUrl, setBackdropUrl] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadBackdrop = async () => {
            const url = await getBackdropUrl(
                movie?.backdrop_path ?? null,
            );

            if (!cancelled) {
                setBackdropUrl(url);
            }
        };

        loadBackdrop();

        return () => {
            cancelled = true;
        };
    }, [movie?.backdrop_path]);

    if (isLoading) {
        return (
            <div
                className={styles.skeleton}
                role="status"
                aria-label="Loading movie"
            />
        );
    }

    if (error || !movie) {
        return (
            <div className={styles.notFound}>
                <p className={styles.status}>
                    {error === "failed"
                        ? "Couldn't load this movie right now."
                        : "We couldn't find this movie."}
                </p>
                <BackLink />
            </div>
        );
    }

    const meta = [
        getYear(movie.release_date),
        movie.genres.map((genre) => genre.name).join("/"),
        formatRuntime(movie.runtime),
    ]
        .filter(Boolean)
        .join(" · ");

    return (
        <article className={styles.page}>
            <section
                className={styles.hero}
                style={
                    backdropUrl
                        ? { backgroundImage: `url("${backdropUrl}")` }
                        : undefined
                }
            >
                <BackLink />

                <div className={styles.info}>
                    <span className={styles.tag}>
                        <Star
                            size={8}
                            fill="currentColor"
                            aria-hidden="true"
                        />
                        Trending
                    </span>

                    <h1 className={styles.title}>{movie.title}</h1>

                    {meta && <p className={styles.meta}>{meta}</p>}

                    {movie.overview && (
                        <p className={styles.overview}>
                            {movie.overview}
                        </p>
                    )}

                    <div className={styles.actions}>
                        <PlayButton
                            trailerUrl={movie.trailer_url}
                            label="Watch Trailer"
                            className={styles.button}
                        />

                        <AddButton
                            movieId={movie.id}
                            label="Add to Watchlist"
                            addedLabel="In Watchlist"
                            className={styles.button}
                        />

                        <ShareButton title={movie.title} />
                    </div>
                </div>

                <RatingSection
                    className={styles.rating}
                    key={movie.id}
                    movieId={movie.id}
                    averageRating={movie.average_rating}
                    ratingsCount={movie.ratings_count}
                />

                <AvailableOn
                    className={styles.available}
                    platforms={AVAILABLE_ON}
                />
            </section>

            <section className={styles.castCrew}>
              <CastCrewMovie casts={movie.cast} />
            </section>

            <section className={styles.moreLikeThis}>
              <MoreLikeMovies movies={similarMovies}/>
            </section>

        </article>
    );
};
