
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FeaturedMovie, FeaturedMovieSkeleton } from "./components/FeaturedMovie";
import { GenreFilter } from "./components/GenreFilter";
import { FilmList } from "../../components/FilmList";

import { useFeaturedMovie } from "./hooks/useFeaturedMovie";
import { useFilms } from "./hooks/useFilms";

import styles from "./CatalogPage.module.scss";

const GENRES = [
  { name: "All", id: null },
  { name: "Sci-Fi", id: 1 },
  { name: "Action", id: 2 },
  { name: "Adventure", id: 3 },
  { name: "Animation", id: 4 },
  { name: "Comedy", id: 8 },
  { name: "Drama", id: 10 },
  { name: "Mystery", id: 11 },
] as const;

export const CatalogPage = () => {
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const activeGenreId =
    GENRES.find((genre) => genre.name === activeGenre)?.id ?? null;

  const {
    movie,
    backdropUrl,
    isLoading,
    error,
  } = useFeaturedMovie();

  const {
    films,
    isLoading: isFilmsLoading,
    error: filmError,
    totalCount,
  } = useFilms(page, activeGenreId);

  const filmsPerPage = 14;
  const totalPages = Math.ceil(totalCount / filmsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre);

    const params = new URLSearchParams(searchParams);
    params.delete("page");
    setSearchParams(params);
  };

  return (
    <section className={styles.catalog}>
      {isLoading && (
        <FeaturedMovieSkeleton className={styles.featured} />
      )}

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
          Couldn't load the trending movie right now.
        </p>
      )}

      <h1 className={styles.title}>All Movies &amp; TV Shows</h1>

      <div className={styles.catalogControls}>
        <GenreFilter
          className={styles.filter}
          genres={GENRES.map((genre) => genre.name)}
          activeGenre={activeGenre}
          onGenreChange={handleGenreChange}
        />

        {totalPages > 1 && (
          <nav
            className={styles.pagination}
            aria-label="Movie pagination"
          >
            <span className={styles.paginationInfo}>
              Page {page} of {totalPages}
            </span>

            <div className={styles.paginationButtons}>
              <button
                type="button"
                className={styles.paginationButton}
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                className={styles.paginationButton}
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </nav>
        )}
      </div>

      <div className={styles.movies}>
        {isFilmsLoading ? (
          <p className={styles.status}>Loading movies...</p>
        ) : filmError ? (
          <p className={styles.status}>
            Couldn't load movies right now.
          </p>
        ) : (
          <FilmList films={films} />
        )}
      </div>
    </section>
  );
};
