import { Link } from 'react-router-dom';
import { 
  AlertCircle, Calendar, ChevronRight, Edit, 
  Film, RefreshCw, Shuffle, Smile, Star 
} from 'lucide-react';
import type { PickedMovie } from '../../../../types/movies';
import type { Moodoption } from '../MoodStep';
import styles from './PreferencesSummary.module.scss';

interface PreferencesSummaryProps {
  effectiveGenres: string[];
  selectedMood: string;
  moods: Moodoption[];
  yearRange: [number, number];
  minRating: number;
  pickedMovie: PickedMovie | null;
  isLoading: boolean;
  isError: string | null;
  onReset: () => void;
  onFindMovies: () => void;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getFullPosterUrl = (path?: string) => {
  if (!path) {
    return "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&fit=crop";
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE_URL}${cleanPath}`;
};

export const PreferencesSummary = ({ 
  effectiveGenres,
  selectedMood,
  moods,
  yearRange,
  minRating,
  pickedMovie,
  isLoading,
  isError,
  onReset,
  onFindMovies,
}: PreferencesSummaryProps) => {
  return (
    <div className={styles.summaryColumn}>
      <div className={styles.summaryCard}>
        <div className={styles.summaryHeader}>
          <h2>Your preferences</h2>
          <button
            type="button"
            className={styles.editButton}
            onClick={onReset}
          >
            <Edit size={14} /> Reset
          </button>
        </div>
        <ul className={styles.summaryList}>
          <li>
            <div className={styles.iconBox}><Film size={18} /></div>
            <div className={styles.itemInfo}>
              <span className={styles.label}>Genres</span>
              <span className={styles.value}>
                {effectiveGenres.length > 0 ? effectiveGenres.join(', ') : 'All'}
              </span>
            </div>
            <ChevronRight size={18} className={styles.chevron} />
          </li>

          <li>
            <div className={styles.iconBox}><Smile size={18} /></div>
            <div className={styles.itemInfo}>
              <span className={styles.label}>Mood</span>
              <span className={styles.value}>
                {selectedMood ? moods.find((m) => m.id === selectedMood)?.label : 'Any'}
              </span>
            </div>
            <ChevronRight size={18} className={styles.chevron} />
          </li>

          <li>
            <div className={styles.iconBox}><Calendar size={18} /></div>
            <div className={styles.itemInfo}>
              <span className={styles.label}>Release year</span>
              <span className={styles.value}>
                {yearRange[0]} - {yearRange[1]}
              </span>
            </div>
            <ChevronRight size={18} className={styles.chevron} />
          </li>

          <li>
            <div className={styles.iconBox}><Star size={18} /></div>
            <div className={styles.itemInfo}>
              <span className={styles.label}>Minimum rating</span>
              <span className={styles.value}>
                {minRating > 0 ? `${minRating}+` : 'Any'}
              </span>
            </div>
            <ChevronRight size={18} className={styles.chevron} />
          </li>
        </ul>

        {isError && (
          <div className={styles.errorBanner}>
            <AlertCircle size={18} />
            <span>{isError}</span>
          </div>
        )}

        {pickedMovie ? (
          <div className={styles.pickedResultCard}>
            <div className={styles.resultPoster}>
              <img
                src={getFullPosterUrl(pickedMovie.poster_path)}
                alt={pickedMovie.title}
              />
            </div>
            <div className={styles.resultDetails}>
              <h3>{pickedMovie.title}</h3>
              <div className={styles.resultMeta}>
                <span>
                  {pickedMovie.release_date ? pickedMovie.release_date.split('-')[0] : ''}
                </span>
                {(pickedMovie.vote_average || pickedMovie.average_rating) > 0 && (
                  <span className={styles.ratingBadge}>
                    ★ {(pickedMovie.vote_average || pickedMovie.average_rating).toFixed(1)}
                  </span>
                )}
              </div>
              <p>{pickedMovie.overview || "No description available."}</p>
              <Link to={`/movie/${pickedMovie.id}`} className={styles.detailsLink}>
                View Details →
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.postersGraphic}>
            <img src="https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" alt="Poster Left" className={styles.posterLeft} />
            <img src="https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg" alt="Poster Center" className={styles.posterCenter} />
            <img src="https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" alt="Poster Right" className={styles.posterRight} />
          </div>
        )}

        <button
          type="button"
          className={styles.findButton}
          onClick={onFindMovies}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw size={20} className={styles.spinIcon} />
              Finding...
            </>
          ) : (
            <>
              <Shuffle size={20} />
              {pickedMovie ? 'Pick another movie' : 'Find my movie →'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};