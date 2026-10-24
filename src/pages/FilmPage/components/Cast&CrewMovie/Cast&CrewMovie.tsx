
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MovieCastMember } from '../../../../api/movies';
import styles from './Cast&CrewMovie.module.scss';

type Props = {
  casts: MovieCastMember[];
};

export const CastCrewMovie = ({ casts }: Props) => {
  const castListRef = useRef<HTMLDivElement>(null);

  const scrollCasts = (direction: number) => {
    castListRef.current?.scrollBy({
      left: direction * 200,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.CastCrewMovieContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Cast & Crew</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollCasts(-1)}
            aria-label="Previous actors"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollCasts(1)}
            aria-label="Next actors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div ref={castListRef} className={styles.castList}>
        {casts.map((cast) => (
          <article key={cast.id} className={styles.castCard}>
            {cast.profile_path ? (
              <img
                className={styles.photo}
                src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                alt={cast.name}
                loading="lazy"
              />
            ) : (
              <div className={styles.noPhoto}>No photo</div>
            )}

            <p className={styles.name}>{cast.name}</p>
            <p className={styles.character}>{cast.character}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
