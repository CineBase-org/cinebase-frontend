const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";
const REFRESH_ENDPOINT = "/api/auth/token/refresh/";

export class ApiError extends Error {
    status: number;
    code?: string;
    detail?: string;

    constructor(status: number, message: string, code?: string, detail?: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.detail = detail;
    }
}

interface ErrorResponseBody {
    detail?: string;
    code?: string;
    [key: string]: unknown;
}

interface RefreshResponse {
    access: string;
    refresh?: string;
}

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${REFRESH_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as RefreshResponse;
        if (!data.access) {
            return null;
        }

        localStorage.setItem("access_token", data.access);

        if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh);
        }

        return data.access;
    } catch {
        return null;
    }
};

export const apiFetch = async <T>(
    path: string,
    init?: RequestInit,
    isRetry = false,
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
        if (!isRetry && path !== REFRESH_ENDPOINT) {
            if (!refreshPromise) {
                refreshPromise = refreshAccessToken().finally(() => {
                    refreshPromise = null;
                });
            }

            const newAccessToken = await refreshPromise;

            if (newAccessToken) {
                return apiFetch<T>(path, init, true);
            }
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        if (window.location.pathname !== "/login") {
            window.location.href = "/login";
        }

        throw new ApiError(401, "Unauthorized");
    }

    if (!response.ok) {
        let errorData: ErrorResponseBody = {};
        try {
            errorData = (await response.json()) as ErrorResponseBody;
        } catch {
            // Ignore JSON parsing errors for non-JSON error responses
        }

        throw new ApiError(
            response.status,
            errorData.detail || `Request to ${path} failed with status ${response.status}`,
            errorData.code,
            errorData.detail
        );
    }

    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
};