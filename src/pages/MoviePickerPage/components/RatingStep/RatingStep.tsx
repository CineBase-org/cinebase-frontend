import { Star } from 'lucide-react';
import styles from './RatingStep.module.scss';
import clsx from 'clsx';

interface RatingStepProps {
  minRating: number;
  onSelectRating: (rating: number) => void;
}

export const RatingStep = ({ minRating, onSelectRating }: RatingStepProps) => (
  <div className={styles.stepSection}>
    <div className={styles.stepTitle}>
      <span className={styles.stepNumber}>4</span>
      <h2>Minimum rating</h2>
    </div>

    <div className={styles.ratingStars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={clsx(styles.star, star * 2 <= minRating && styles.filled)}
          onClick={() => onSelectRating(star * 2)}
        />
      ))}
      <span className={styles.ratingValue}>
        {minRating > 0 ? `${minRating}+` : 'Any'}
      </span>
    </div>
  </div>
);