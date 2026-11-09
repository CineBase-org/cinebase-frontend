import clsx from 'clsx';
import styles from './GenreStep.module.scss';
import { X } from 'lucide-react';

interface GenreProps {
  genres: string[]; 
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
};

export const GenreStep = ({ genres, selectedGenres, onToggleGenre }: GenreProps) => (
  <div className={styles.stepSection}>
    <div className={styles.stepTitle}>
      <span className={styles.stepNumber}>1</span>
      <h2>Choose genres</h2>
    </div>
    <div className={styles.genresCloud}>
      {genres.map((genre) => {
        const isAll = genre === 'All';
        const isSelected = isAll
          ? selectedGenres.length === 0
          : selectedGenres.includes(genre);

          return (
            <button
              key={genre}
              type="button"
              className={clsx(styles.genrePill, isSelected && styles.selected)}
              onClick={() => onToggleGenre(genre)}
            >
              {genre}
              {isSelected && !isAll && <X size={14} />}
            </button>
          );
      })}
    </div>
  </div>
);