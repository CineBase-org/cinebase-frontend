import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMovies } from "../../../api/movies";

export const useFilms = (page: number, genreId: number | null, searchQuery: string = "") => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", page, genreId, searchQuery],
    
    queryFn: () => 
      getMovies({
        page,
        genres: genreId === null ? undefined : String(genreId),

        search: searchQuery || undefined, 
      }),
      
    placeholderData: keepPreviousData,
  });

  return {
    films: data?.results ?? [],
    isLoading,
    error: isError,
    totalCount: data?.count ?? 0,
  };
};