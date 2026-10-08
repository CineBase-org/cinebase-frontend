import { apiFetch } from "./client";

interface ImageConfig {
    base_url: string;
    poster_sizes: string[];
    backdrop_sizes: string[];
    profile_sizes: string[];
}

// The config rarely (if ever) changes, so fetch it once per session and
// reuse the same promise for every caller.
let configPromise: Promise<ImageConfig> | null = null;

const getImageConfig = () => {
    if (!configPromise) {
        configPromise = apiFetch<ImageConfig>("/api/config/images/");
    }
    return configPromise;
};

export const getBackdropUrl = async (
    path: string | null,
    size: "w300" | "w780" | "w1280" | "original" = "w1280",
) => {
    if (!path) return null;

    const config = await getImageConfig();
    const resolvedSize =
        config.backdrop_sizes.find((s) => s === size) ??
        config.backdrop_sizes.at(-1) ??
        size;

    return `${config.base_url}${resolvedSize}${path}`;
};

export const getPosterUrl = async (
    path: string | null,
    size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500",
) => {
    if (!path) return null;

    const config = await getImageConfig();
    const resolvedSize =
        config.poster_sizes.find((s) => s === size) ??
        config.poster_sizes.at(-1) ??
        size;

    return `${config.base_url}${resolvedSize}${path}`;
};
