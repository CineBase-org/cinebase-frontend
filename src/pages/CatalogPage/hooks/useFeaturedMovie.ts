import { useEffect, useState } from "react";
import { getRandomMovie, type MovieDetail } from "../../../api/movies";
import { getBackdropUrl } from "../../../api/images";

interface State {
    movie: MovieDetail | null;
    backdropUrl: string | null;
    isLoading: boolean;
    error: boolean;
}

export const useFeaturedMovie = () => {
    const [state, setState] = useState<State>({
        movie: null,
        backdropUrl: null,
        isLoading: true,
        error: false,
    });

    useEffect(() => {
        let isCancelled = false;

        getRandomMovie()
            .then(async (movie) => {
                const backdropUrl = await getBackdropUrl(movie.backdrop_path);
                if (!isCancelled)
                    setState({ movie, backdropUrl, isLoading: false, error: false });
            })
            .catch(() => {
                if (!isCancelled)
                    setState({
                        movie: null,
                        backdropUrl: null,
                        isLoading: false,
                        error: true,
                    });
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    return state;
};
