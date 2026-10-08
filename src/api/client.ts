// In dev this stays relative so requests go through the Vite proxy
// configured in vite.config.ts (the backend doesn't send CORS headers).
// In prod, point VITE_API_URL at a same-origin reverse proxy or a backend
// that allows cross-origin requests.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export const apiFetch = async <T>(
    path: string,
    init?: RequestInit,
): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            Accept: "application/json",
            ...init?.headers,
        },
        ...init,
    });

    if (!response.ok) {
        throw new ApiError(
            response.status,
            `Request to ${path} failed with status ${response.status}`,
        );
    }

    return (await response.json()) as T;
};
