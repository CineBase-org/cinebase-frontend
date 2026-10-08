import { apiFetch } from "./client";

export interface Genre {
    id: number;
    name: string;
}

export interface MovieListItem {
    id: number;
    title: string;
    genres: string[];
    release_date: string | null;
    vote_average: number;
    poster_path: string | null;
}

export interface MovieCastMember {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
    order: number;
}

export interface MovieDetail {
    id: number;
    title: string;
    genres: Genre[];
    cast: MovieCastMember[];
    release_date: string | null;
    overview: string;
    runtime: number | null;
    vote_average: number;
    poster_path: string | null;
    backdrop_path: string | null;
    average_rating: number;
    ratings_count: number;
    trailer_url: string | null;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const getMovies = (params?: {
    page?: number;
    genres?: string;
    search?: string;
}) => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.genres) query.set("genres", params.genres);
    if (params?.search) query.set("search", params.search);

    const queryString = query.toString();
    return apiFetch<PaginatedResponse<MovieListItem>>(
        `/api/movies/${queryString ? `?${queryString}` : ""}`,
    );
};

export const getMovieById = (id: number) =>
    apiFetch<MovieDetail>(`/api/movies/${id}/`);

const randomInt = (maxExclusive: number) =>
    Math.floor(Math.random() * maxExclusive);

/**
 * Picks a random movie from the catalog and returns its full detail.
 * Changes on every call, e.g. so a "trending now" slot differs on each page load.
 */
export const getRandomMovie = async (): Promise<MovieDetail> => {
    const firstPage = await getMovies({ page: 1 });
    const pageSize = firstPage.results.length;

    if (pageSize === 0) {
        throw new Error("No movies available");
    }

    const totalPages = Math.max(1, Math.ceil(firstPage.count / pageSize));
    const randomPage = randomInt(totalPages) + 1;

    const page =
        randomPage === 1 ? firstPage : await getMovies({ page: randomPage });
    const candidate = page.results[randomInt(page.results.length)];

    return getMovieById(candidate.id);
};
