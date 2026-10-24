const STORAGE_KEY = "cinebase:watchlist";

export type WatchlistStorageResult<T> =
    | { ok: true; value: T }
    | { ok: false; error: unknown };

export const readWatchlist = (): WatchlistStorageResult<number[]> => {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === null) return { ok: true, value: [] };

        const parsed: unknown = JSON.parse(stored);
        if (
            !Array.isArray(parsed) ||
            !parsed.every((id) => Number.isInteger(id) && id > 0)
        ) {
            throw new Error("Stored watchlist has an invalid format");
        }

        return { ok: true, value: parsed };
    } catch (error: unknown) {
        return { ok: false, error };
    }
};

export const writeWatchlist = (
    movieIds: number[],
): WatchlistStorageResult<void> => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(movieIds));
        return { ok: true, value: undefined };
    } catch (error: unknown) {
        return { ok: false, error };
    }
};
