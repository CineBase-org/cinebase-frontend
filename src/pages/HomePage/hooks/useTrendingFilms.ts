import { useEffect, useState } from "react";
import { getMovies, type MovieListItem } from "../../../api/movies";

interface State {
    films: MovieListItem[];
    isLoading: boolean;
    error: boolean;
}

const TRENDING_COUNT = 14;

// The API has no dedicated "trending" endpoint, so show top-rated films
// from the first catalog page instead.
export const useTrendingFilms = () => {
    const [state, setState] = useState<State>({
        films: [],
        isLoading: true,
        error: false,
    });

    useEffect(() => {
        let isCancelled = false;

        getMovies({ page: 1 })
            .then((response) => {
                if (isCancelled) return;

                const films = [...response.results]
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .slice(0, TRENDING_COUNT);

                setState({ films, isLoading: false, error: false });
            })
            .catch(() => {
                if (!isCancelled)
                    setState({ films: [], isLoading: false, error: true });
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    return state;
};
