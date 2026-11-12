import {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useEffect,
  type PropsWithChildren,
} from "react";

import {
  WatchlistContext,
  watchlistReducer,
  type WatchlistState,
} from "./WatchlistContext";
import { analytics } from "../services/analytics";
import { apiFetch } from "../api/client";
import { useAuth } from "../contexts/AuthContext"; 

const initialState: WatchlistState = { movieIds: [], hasError: false };

interface WatchlistMovie {
  id: number;
}

export const WatchlistProvider = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(watchlistReducer, initialState);
  const movieIdsRef = useRef(state.movieIds);

  useEffect(() => {
      const fetchWatchlist = async () => {
          if (!isAuthenticated) {
              movieIdsRef.current = [];
              dispatch({ type: "replace", movieIds: [] });
              return;
          }

          try {
              const response = await apiFetch<WatchlistMovie[]>('/api/watchlist/', { 
                  method: 'GET' 
              });
              
              const ids = response.map((movie) => movie.id);

              movieIdsRef.current = ids;
              dispatch({ type: "replace", movieIds: ids });
          } catch (error) {
              console.error("Failed to fetch initial watchlist:", error);
          }
      };

      fetchWatchlist();
  }, [isAuthenticated]);

  const toggleMovie = useCallback(
      (movieId: number) => {
          if (!isAuthenticated) {
              dispatch({ type: "error" });
              return false;
          }

          const exists = movieIdsRef.current.includes(movieId);
          
          const nextMovieIds = exists ?
              movieIdsRef.current.filter((id) => id !== movieId) :
              [...movieIdsRef.current, movieId];

          movieIdsRef.current = nextMovieIds;
          dispatch({ type: "replace", movieIds: nextMovieIds });

          const performApiCall = async () => {
              try {
                  if (exists) {
                      await apiFetch(`/api/movies/${movieId}/watchlist/`, { 
                          method: 'DELETE' 
                      });
                      analytics.track('watchlist_remove', { movie_id: movieId });
                  } else {
                      await apiFetch(`/api/movies/${movieId}/watchlist/`, { 
                          method: 'PUT' 
                      });
                      analytics.track('watchlist_add', { movie_id: movieId });
                  }
              } catch (error) {
                  console.error("Watchlist API error:", error);
                  // Відкат (rollback) у разі помилки
                  const rolledBackIds = exists ?
                      [...movieIdsRef.current, movieId] : 
                      movieIdsRef.current.filter((id) => id !== movieId);
                      
                  movieIdsRef.current = rolledBackIds;
                  dispatch({ type: "replace", movieIds: rolledBackIds });
                  dispatch({ type: "error" });
              }
          };

          performApiCall();

          return true;
      },
      [isAuthenticated]
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