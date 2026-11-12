import { useState } from "react";
import clsx from "clsx";

import { StarRating } from "../../../../components/StarRating";
import { useUserRating } from "../../hooks/useUserRating";

import styles from "./RatingSection.module.scss";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { apiFetch } from "../../../../api/client"; 
import { analytics } from "../../../../services/analytics";

const LABELS = ["Terrible", "Poor", "Okay", "Good", "Great"] as const;

interface Props {
  movieId: number;
  averageRating: number;
  ratingsCount: number;
  className?: string;
}

const formatScore = (value: number) => String(Number(value.toFixed(1)));

export const RatingSection = ({
  movieId,
  averageRating,
  ratingsCount,
  className,
}: Props) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { rating: userRating, setRating } = useUserRating(movieId);
  const [hovered, setHovered] = useState<number | null>(null);

  const count = ratingsCount + (userRating !== null ? 1 : 0);
  const average =
      userRating !== null ?
          (averageRating * ratingsCount + userRating) / count
      :   averageRating;

  const feedbackValue = hovered ?? userRating;

  const handleRatingChange = async (newRating: number) => {
    if (!isAuthenticated) {
      navigate("/login", { state: {from: location.pathname }});
      return;
    }

    const previousRating = userRating; 
    setRating(newRating);

    try {
      await apiFetch(`/api/movies/${movieId}/rating/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: newRating }),
      });
      
      analytics.track('movie_rate', {
        movie_id: movieId,
        properties: { score: newRating }
      });
      
    } catch (error) {
      console.error("Failed to send rating to backend:", error);
      setRating(previousRating);
    }
  }

    return (
        <section
            className={clsx(styles.box, className)}
            aria-label="Ratings"
        >
            <h2 className={styles.label}>Your Rating</h2>
            <div className={styles.row}>
                <StarRating
                    value={average}
                    size={26}
                />
                <span className={styles.score}>
                    {count > 0 ? formatScore(average) : "–"} / 5
                </span>
            </div>

            <h2 className={styles.label}>Rate This Movie</h2>
            <StarRating
                value={userRating ?? 0}
                size={26}
                onChange={handleRatingChange}
                onHover={setHovered}
            />

            <p
                className={styles.feedback}
                aria-live="polite"
            >
                {feedbackValue !== null && feedbackValue > 0 ?
                     LABELS[Math.ceil(feedbackValue) - 1] 
                :   ""}
                {hovered === null && userRating !== null && (
                    <span className={styles.thanks}> · Thanks for rating!</span>
                )}
            </p>
        </section>
    );
};