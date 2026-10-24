import { useEffect, useState } from "react";

import { getPosterUrl } from "../api/images";

interface PosterState {
    path: string | null;
    url: string | null;
}

export const usePosterUrl = (path: string | null) => {
    const [poster, setPoster] = useState<PosterState>({
        path: null,
        url: null,
    });

    useEffect(() => {
        let isCancelled = false;

        getPosterUrl(path, "w342")
            .then((url) => {
                if (!isCancelled) setPoster({ path, url });
            })
            .catch((error: unknown) => {
                if (isCancelled) return;
                console.error("Failed to resolve poster image URL", error);
                setPoster({ path, url: null });
            });

        return () => {
            isCancelled = true;
        };
    }, [path]);

    return poster.path === path ? poster.url : null;
};
