import { useState } from "react";
import clsx from "clsx";

import { StarRating } from "../../../../components/StarRating";
import { useUserRating } from "../../hooks/useUserRating";

import styles from "./RatingSection.module.scss";

const LABELS = ["Terrible", "Poor", "Okay", "Good", "Great"] as const;

interface Props {
    movieId: number;
    /** Average of all users' ratings, 0..5 */
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
    const { rating: userRating, setRating } = useUserRating(movieId);
    const [hovered, setHovered] = useState<number | null>(null);

    // Average = server average + the user's own vote.
    const count = ratingsCount + (userRating !== null ? 1 : 0);
    const average =
        userRating !== null ?
            (averageRating * ratingsCount + userRating) / count
        :   averageRating;

    const feedbackValue = hovered ?? userRating;

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
                onChange={setRating}
                onHover={setHovered}
            />

            <p
                className={styles.feedback}
                aria-live="polite"
            >
                {feedbackValue !== null && feedbackValue > 0 ?
                    LABELS[feedbackValue - 1]
                :   ""}
                {hovered === null && userRating !== null && (
                    <span className={styles.thanks}> · Thanks for rating!</span>
                )}
            </p>
        </section>
    );
};
