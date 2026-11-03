export const getYear = (date: string | null): string =>
    date ? date.slice(0, 4) : "";

export const formatRuntime = (minutes: number | null): string => {
    if (!minutes || minutes <= 0) return "";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
};

export const getYouTubeEmbedUrl = (url: string | null | undefined): string | null => {
  
    if (!url) return null;

    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = url.match(regExp);

    if (match && match[1]) {
        return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`;
    }

    return null;
};