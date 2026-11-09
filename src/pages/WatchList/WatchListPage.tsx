import { useState } from 'react';
import { FilmList } from '../../components/FilmList';
import { useWatchlist } from '../../contexts/useWatchlist';
import { useWatchlistMovies } from './hooks/useWatchlistMovies';

import styles from './WatchListPage.module.scss';
import { Search } from 'lucide-react';
import clsx from 'clsx';

export const WatchList = () => {
  const { movieIds } = useWatchlist();
  const { films, isLoading, error } = useWatchlistMovies(movieIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating");
  const [activeGenre, setActiveGenre] = useState<string | null>(null)

  const availableGenres = Array.from(
    new Set(films.flatMap((film) => film.genres || [])) 
  )
    .filter(Boolean) 
    .sort();

    console.log("Мої фільми у WatchList:", films);
    console.log("Знайдені жанри:", availableGenres);

  const displayFilms = films
    .filter(film => {
      const matchesSearch = film.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = activeGenre ? film.genres.includes(activeGenre) : true;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.vote_average - a.vote_average;
      };

      if (sortBy === "year") {
        return (b.release_date || '' ).localeCompare(a.release_date || '');
      };

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      };

      return 0;
    });

  return (
    <section className={styles.watchListContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          My Watchlist
          {!isLoading && <span className={styles.count}>{films.length}</span>}
        </h1>

        {films.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.localSearch}>
              <Search size={18} />
                <input
                  type="text"
                  placeholder="Find in my list"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.sortWrapper}>
              <span className={styles.sortLabel}>Sort by:</span>
                <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "year" | "title")}
              >
                  <option value="rating">Top Rated</option>
                  <option value="year">Newest</option>
                  <option value="title">A-Z</option>
                </select>
            </div>
          </div>
        )}
      </div>

      {availableGenres.length > 0 && (
        <ul className={styles.list}>
          <li className={styles.item}>
            <button
              className={clsx(styles.chip, !activeGenre && styles.active)}
              onClick={() => setActiveGenre(null)}
            >
              All
            </button>
          </li>
          
          {availableGenres.map((genre) => (
            <li key={genre} className={styles.item}>
              <button
                className={clsx(styles.chip, activeGenre === genre && styles.active)}
                onClick={() => setActiveGenre(genre)}
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      )}

      {movieIds.length === 0 ? (
                <p className={styles.emptyState}>
                    Your watchlist is empty. Explore the catalog to add some movies!
                </p>
            ) : isLoading ? (
                <p className={styles.loading}>Loading movies...</p>
            ) : error ? (
                <p className={styles.error}>Could not load some movies.</p>
            ) : (
                <div className={styles.movies}>
                    <FilmList films={displayFilms} />
                </div>
            )}
    </section>
  );
};