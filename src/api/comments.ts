import { apiFetch } from "./client";

export interface Comment {
    id: number;
    movie: number;
    text: string;
    created_at: string;
    parent: number | null;
    author: string; 
    likes_count: number;
    is_liked: boolean;
}

export interface CommentsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Comment[];
}

export const getComments = (movieId: number): Promise<CommentsResponse> => {
    return apiFetch<CommentsResponse>(`/api/comments/?movie=${movieId}`); 
};

export const postComment = (movieId: number, text: string): Promise<Comment> => {
    return apiFetch<Comment>(`/api/comments/`, {
        method: "POST",
        body: JSON.stringify({ 
            movie: movieId,
            text: text 
        }),
    });
};