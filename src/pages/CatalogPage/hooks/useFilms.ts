import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMovies } from "../../../api/movies";

export const useFilms = (page: number, genreIds: string | null, searchQuery: string = "") => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", page, genreIds, searchQuery],
    
    queryFn: () => 
      getMovies({
        page,
        genres: genreIds === null ? undefined : genreIds,
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