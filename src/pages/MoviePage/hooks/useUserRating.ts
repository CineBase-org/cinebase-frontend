import { useCallback, useState } from "react";

const storageKey = (movieId: number) => `cinebase:rating:${movieId}`;

const readRating = (movieId: number): number | null => {
    try {
        const raw = window.localStorage.getItem(storageKey(movieId));
        const value = raw === null ? NaN : Number(raw);
        return Number.isInteger(value) && value >= 1 && value <= 5 ? value : null;
    } catch {
        return null;
    }
};

/**
 * The user's own rating for a movie (1..5).
 *
 * TODO: the rating endpoint isn't part of the API client yet. Until it is,
 * the rating is kept in state and mirrored to localStorage so it survives
 * a page reload. Replace `setRating` internals with an API call later.
 */
export const useUserRating = (movieId: number) => {
    const [rating, setRatingState] = useState<number | null>(() =>
        readRating(movieId),
    );

    const setRating = useCallback(
        (value: number) => {
            setRatingState(value);

            try {
                window.localStorage.setItem(storageKey(movieId), String(value));
            } catch {
                // storage unavailable (private mode etc.) – keep in-memory value
            }
        },
        [movieId],
    );

    return { rating, setRating };
};
