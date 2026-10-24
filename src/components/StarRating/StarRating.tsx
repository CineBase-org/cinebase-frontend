import { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

import styles from "./StarRating.module.scss";

interface Props {
    /** Current value, 0..max. Can be fractional in read-only mode (e.g. 4.2). */
    value: number;
    max?: number;
    size?: number;
    /** When provided the stars become interactive. */
    onChange?: (value: number) => void;
    /** Reports the star under the pointer / focus (null when it leaves). */
    onHover?: (value: number | null) => void;
    className?: string;
}

export const StarRating = ({
    value,
    max = 5,
    size = 24,
    onChange,
    onHover,
    className,
}: Props) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const isInteractive = Boolean(onChange);

    const shown = isInteractive && hoverValue !== null ? hoverValue : value;

    const updateHover = (next: number | null) => {
        setHoverValue(next);
        onHover?.(next);
    };

    return (
        <div
            className={clsx(styles.stars, className)}
            role={isInteractive ? "radiogroup" : "img"}
            aria-label={
                isInteractive ? "Rate this movie" : `${value} out of ${max}`
            }
            onMouseLeave={isInteractive ? () => updateHover(null) : undefined}
        >
            {Array.from({ length: max }, (_, index) => {
                const starNumber = index + 1;
                const fillPercent =
                    Math.min(1, Math.max(0, shown - index)) * 100;

                const icon = (
                    <>
                        <Star size={size} />
                        <span
                            className={styles.fill}
                            style={{ width: `${fillPercent}%` }}
                            aria-hidden="true"
                        >
                            <Star
                                size={size}
                                fill="currentColor"
                            />
                        </span>
                    </>
                );

                if (!isInteractive) {
                    return (
                        <span
                            key={starNumber}
                            className={styles.star}
                        >
                            {icon}
                        </span>
                    );
                }

                return (
                    <button
                        key={starNumber}
                        type="button"
                        role="radio"
                        aria-checked={Math.round(value) === starNumber}
                        aria-label={`${starNumber} out of ${max}`}
                        className={clsx(styles.star, styles.interactive)}
                        onMouseEnter={() => updateHover(starNumber)}
                        onFocus={() => updateHover(starNumber)}
                        onBlur={() => updateHover(null)}
                        onClick={() => onChange?.(starNumber)}
                    >
                        {icon}
                    </button>
                );
            })}
        </div>
    );
};
