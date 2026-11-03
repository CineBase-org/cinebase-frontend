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
    const accessToken = localStorage.getItem("access_token");

    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/json");

    if (init?.body && typeof init.body === "string" && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        throw new ApiError(401, "Unauthorized");
    }

    if (!response.ok) {
        throw new ApiError(
            response.status,
            `Request to ${path} failed with status ${response.status}`,
        );
    }

    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
};