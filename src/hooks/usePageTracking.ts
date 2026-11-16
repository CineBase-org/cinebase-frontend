import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { analytics } from "../services/analytics";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/movie/')) {
      const movieId = Number(path.split('/')[2]);
      analytics.track('movie_details_view', { movie_id: movieId });
    } else if (path === '/catalog') {
      analytics.track('catalog_view');
    } else {
      analytics.track('page_view')  ;
    }
  }, [location]);
};
