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
    // 1. Дістаємо токен доступу з пам'яті браузера
    const accessToken = localStorage.getItem("access_token");

    // 2. Створюємо об'єкт заголовків на основі тих, що могли передати
    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/json");

    // Додаємо Content-Type для POST/PUT/PATCH запитів з JSON
    if (init?.body && typeof init.body === "string" && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    // 3. Якщо токен є, прикріплюємо його
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    // 4. Робимо сам запит
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers,
    });

    // 5. Обробка протермінованого токена (Unauthorized)
    if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // Пізніше ми додамо логіку оновлення токена через refresh, 
        // але поки що просто викидаємо помилку
        throw new ApiError(401, "Unauthorized");
    }

    if (!response.ok) {
        throw new ApiError(
            response.status,
            `Request to ${path} failed with status ${response.status}`,
        );
    }

    // Перевіряємо, чи є тіло відповіді, щоб не парсити порожній JSON (наприклад, при статус-коді 204)
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
};