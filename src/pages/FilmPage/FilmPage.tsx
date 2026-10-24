import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './FilmPage.module.scss';

import { getBackdropUrl } from '../../api/images';
import { useSimilarMovies } from './hooks/useSimilarMovies';
import { useMovieDetails } from './hooks/useMovieDetails';

import { BanerMovie } from './components/BanerMovie';
import { AvailableOn } from './components/AvailableOn';
import { UserRating } from './components/UserRating';
import { CastCrewMovie } from './components/Cast&CrewMovie';
import { MoreLikeMovies } from './components/MoreLikeMovies';


  export const FilmPage = () => {
    const [backdrop, setBackdrop] = useState<{
      path: string | null;
      url: string | null;
    } | null>(null);

    const { id } = useParams();
    const movieId = Number(id);

    const {
      movie,
      isLoading,
      error,
    } = useMovieDetails(movieId);

    const similarMovies = useSimilarMovies(movie);

    useEffect(() => {
      if (!movie) {
        return;
      }

      let isCancelled = false;
      const path = movie.backdrop_path;

      getBackdropUrl(path)
        .then((url) => {
          if (!isCancelled) {
            setBackdrop({ path, url });
          }
        })

        .catch(() => {
          if (!isCancelled) {
            setBackdrop({
              path,
              url: null,
            });
          }
        });

        return () => {
          isCancelled = true;
        };
    }, [movie?.backdrop_path]);

    const backdropUrl =
      backdrop && backdrop.path === movie?.backdrop_path
        ? backdrop.url
        : null;

        

    
    return (
      <section className={styles.filmPage}>
        <Link to="/catalog" className={styles.backButton}>
          <ArrowLeft size={18} />
          Back to catalog
        </Link>
        {isLoading && <p>Loading movie...</p>}

        {!isLoading && error && (
          <p className={styles.bannerError}>
            Couldn't load the movie right now.
          </p>
        )}

        {!isLoading && movie && (
          <>
          <div
            className={styles.movieHero}
            style={
              backdropUrl
                ? { backgroundImage: `url(${backdropUrl})` }
                : undefined
            }
          >
            <div className={styles.overlay} />

            <div className={styles.banner}>
              <BanerMovie
                title={movie.title}
                description={movie.overview}
                genres={movie.genres.map((genre) => genre.name)}
                runtime={
                  movie.runtime !== null
                    ? `${movie.runtime} min`
                    : 'Runtime unknown'
                }
                date={movie.release_date ?? 'Release date unknown'}
                trailerUrl={movie.trailer_url}
                backdropUrl={backdropUrl}
              />
            </div>

            <div className={styles.userRating}>
              <UserRating />
            </div>

            <div className={styles.availableOn}>
              <AvailableOn
                platforms={movie.streaming_platforms}
              />
            </div>
          </div>

          <CastCrewMovie casts={movie.cast} />
          <MoreLikeMovies movies={similarMovies} />
          </>
        )}
      </section>
    );
  };