import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type MovieListItem, type PaginatedResponse } from "../../api/movies";
import { apiFetch } from "../../api/client";
import { FilmList } from "../../components/FilmList";
import styles from './ActorPage.module.scss';

interface PersonDetails {
  id: number;
  name: string;
  profile_path: string | null;
  movies_count: number;
}

export const ActorPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        setIsLoading(true);
        setIsError(null);

        const [personData, moviesData] = await Promise.all([
          apiFetch<PersonDetails>(`/api/people/${id}/`),
          apiFetch<PaginatedResponse<MovieListItem>>(`/api/movies/?actor=${id}&page=${page}`)
        ]);

        setPerson(personData);
        setMovies(moviesData.results);
        setTotalCount(moviesData.count);
      } catch (error) {
        console.error("Failed to load actor page data:", error);
        setIsError("Failed to load information about the actor.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchActorData();
    }
  }, [id, page]);

  const filmsPerPage = 14; 
  const totalPages = Math.ceil(totalCount / filmsPerPage) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    setSearchParams(params);
  };

  if (isLoading && movies.length === 0) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (isError || !person) {
    return <div className={styles.error}>{isError || "Actor not found"}</div>;
  }

  return (
    <div className={styles.actorPageContainer}>
      <div className={styles.actorHeader}>
        {person.profile_path ? (
          <img
            src={
              person.profile_path.startsWith("http")
              ? person.profile_path
              : `https://image.tmdb.org/t/p/w500${person.profile_path}`
            }
            alt={person.name}
            className={styles.profileImage}
          />
        ) : (
          <div className={styles.noPhoto}>No Photo</div>
        )}

        <div className={styles.actorInfo}>
          <h1 className={styles.actorName}>{person.name}</h1>
          <p className={styles.moviesCount}>Films in the database: {person.movies_count}</p>
        </div>
      </div>

      <div className={styles.moviesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Films featuring the actor</h2>

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Actor movies pagination">
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

        {movies.length === 0 ? (
          <p className={styles.noMovies}>No films featuring this actor were found.</p>
        ) : (
          <div className={styles.movies}>
            <FilmList films={movies} />
          </div>
        )}
      </div>
    </div>
  );
};