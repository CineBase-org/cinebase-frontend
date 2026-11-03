import { useQuery } from "@tanstack/react-query";
import { getRandomMovie } from "../../../api/movies";
import { getBackdropUrl } from "../../../api/images";

export const useFeaturedMovie = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["featuredMovie"],
        
        queryFn: async () => {
            const movie = await getRandomMovie();
            const backdropUrl = await getBackdropUrl(movie.backdrop_path);
            
            return { movie, backdropUrl };
        },
        staleTime: Infinity, 
    });

    return {
        movie: data?.movie ?? null,
        backdropUrl: data?.backdropUrl ?? null,
        isLoading,
        error: isError,
    };
};