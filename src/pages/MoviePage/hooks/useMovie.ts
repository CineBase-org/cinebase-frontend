import { useEffect, useState } from "react";
import { ApiError } from "../../../api/client";
import { getMovieById, type MovieDetail } from "../../../api/movies";

type MovieError = "not-found" | "failed" | null;

interface State {
    /** id the state belongs to, so stale data is never shown for a new id */
    id: number | null;
    movie: MovieDetail | null;
    error: MovieError;
}

const initialState: State = {
    id: null,
    movie: null,
    error: null,
};

export const useMovie = (id: number) => {
    const [state, setState] = useState<State>(initialState);

    const isValidId = Number.isInteger(id) && id > 0;

    useEffect(() => {
        if (!isValidId) return;

        let isCancelled = false;

        getMovieById(id)
            .then((movie) => {
                if (!isCancelled) setState({ id, movie, error: null });
            })
            .catch((error: unknown) => {
                if (isCancelled) return;

                setState({
                    ...initialState,
                    id,
                    error:
                        error instanceof ApiError && error.status === 404
                            ? "not-found"
                            : "failed",
                });
            });

        return () => {
            isCancelled = true;
        };
    }, [id, isValidId]);

    if (!isValidId) {
        return { ...initialState, isLoading: false, error: "not-found" as const };
    }

    if (state.id !== id) {
        return { ...initialState, isLoading: true };
    }

    return { ...state, isLoading: false };
};
