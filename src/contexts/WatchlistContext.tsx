import {
    createContext,
} from "react";

interface State {
    movieIds: number[];
    hasError: boolean;
}

type Action =
    | { type: "replace"; movieIds: number[] }
    | { type: "error" };

export interface WatchlistContextValue extends State {
    toggleMovie: (movieId: number) => boolean;
}

export const WatchlistContext =
    createContext<WatchlistContextValue | null>(null);

export const watchlistReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "replace":
            return { movieIds: action.movieIds, hasError: false };
        case "error":
            return { ...state, hasError: true };
    }
};

export type { State as WatchlistState, Action as WatchlistAction };
