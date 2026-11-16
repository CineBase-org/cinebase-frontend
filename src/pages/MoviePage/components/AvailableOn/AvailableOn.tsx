import clsx from "clsx";
import styles from "./AvailableOn.module.scss";

export interface Platform {
    id: number;
    name: string;
    logo_url: string;
}

interface Props {
    platforms: readonly Platform[];
    className?: string;
}

const getPlatformHomeUrl = (platformName: string): string => {
  const homeUrls: Record<string, string> = {
    "Netflix": "https://www.netflix.com",
    "Apple TV Store": "https://tv.apple.com",
    "YouTube": "https://www.youtube.com",
    "Amazon Video": "https://www.primevideo.com",
    "Fandango At Home": "https://athome.fandango.com",
    "Google Play Movies": "https://play.google.com/store/movies",
    "Disney Plus": "https://www.disneyplus.com/",
    "HBO Max": "https://www.hbomax.com/",
  };

    return homeUrls[platformName] || "#";
};

export const AvailableOn = ({ platforms, className }: Props) => {
    if (platforms.length === 0) return null;

    return (
        <section
            className={clsx(styles.section, className)}
            aria-labelledby="available-on-title"
        >
            <h2
                id="available-on-title"
                className={styles.title}
            >
                Available On
            </h2>

            <ul className={styles.list}>
                {platforms.map((platform) => {
                    const homeUrl = getPlatformHomeUrl(platform.name);

                    return (
                        <li key={platform.id}>
                            <a
                                href={homeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.logo}
                                title={`Go to ${platform.name}`}
                                aria-label={platform.name}
                            >
                                {platform.logo_url ? (
                                    <img
                                        src={platform.logo_url}
                                        alt={platform.name} 
                                    />
                                ) : (
                                    <span>{platform.name.charAt(0)}</span>
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};