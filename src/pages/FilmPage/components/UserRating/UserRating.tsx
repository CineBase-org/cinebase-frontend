import { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './UserRating.module.scss';


type Props = {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
};

export const UserRating = ({ 
  initialRating = 0, 
  onRatingChange,
}: Props) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayedRating = hoverRating ?? rating;

  const handleRatingChange = (value: number) => {
    setRating(value);
    onRatingChange?.(value);
  };

  return (
    <div 
      className={styles.UserRatingContainer}
      onMouseLeave={() => setHoverRating(null)}
    >
      <p className={styles.title}>Rate this movie</p>

      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => {
          const starNumber = index + 1;
          const fill = Math.max(
            0,
            Math.min(1, displayedRating - index),
          );

          return (
            <div className={styles.star} key={starNumber}>
              <Star
                className={styles.starIcon}
                aria-hidden="true"
              />

              <div
                className={styles.fill}
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={styles.filledIcon}
                  aria-hidden="true"
                />
              </div>

              <button
                className={styles.halfButton}
                type="button"
                aria-label={`Rate ${starNumber - 0.5} out of 5`}
                onMouseEnter={() =>
                  setHoverRating(starNumber - 0.5)
                }
                onFocus={() =>
                  setHoverRating(starNumber - 0.5)
                }
                onBlur={() => setHoverRating(null)}
                onClick={() =>
                  handleRatingChange(starNumber - 0.5)
                }
              />

              <button
                className={`${styles.halfButton} ${styles.rightHalf}`}
                type="button"
                aria-label={`Rate ${starNumber} out of 5`}
                onMouseEnter={() =>
                  setHoverRating(starNumber)
                }
                onFocus={() => setHoverRating(starNumber)}
                onBlur={() => setHoverRating(null)}
                onClick={() => handleRatingChange(starNumber)}
              />
            </div>
          );
        })}
      </div>

      <p className={styles.value}>
        {displayedRating.toFixed(1)} / 5
      </p>
    </div>
  );
};