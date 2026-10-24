import {
    useCallback,
    useMemo,
    useReducer,
    useRef,
    type PropsWithChildren,
} from "react";

import { readWatchlist, writeWatchlist } from "../utils/watchlistStorage";
import {
    WatchlistContext,
    watchlistReducer,
    type WatchlistState,
} from "./WatchlistContext";

const initializeWatchlist = (): WatchlistState => {
    const result = readWatchlist();
    if (!result.ok) {
        console.error("Failed to read watchlist from local storage", result.error);
        return { movieIds: [], hasError: true };
    }

    return { movieIds: result.value, hasError: false };
};

export const WatchlistProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(
        watchlistReducer,
        undefined,
        initializeWatchlist,
    );
    const movieIdsRef = useRef(state.movieIds);

    const toggleMovie = useCallback(
        (movieId: number) => {
            const exists = movieIdsRef.current.includes(movieId);
            const nextMovieIds =
                exists ?
                    movieIdsRef.current.filter((id) => id !== movieId)
                :   [...movieIdsRef.current, movieId];

            const result = writeWatchlist(nextMovieIds);
            if (!result.ok) {
                console.error(
                    "Failed to save watchlist to local storage",
                    result.error,
                );
                dispatch({ type: "error" });
                return false;
            }

            movieIdsRef.current = nextMovieIds;
            dispatch({ type: "replace", movieIds: nextMovieIds });
            return true;
        },
        [dispatch],
    );

    const value = useMemo(
        () => ({ ...state, toggleMovie }),
        [state, toggleMovie],
    );

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
};
