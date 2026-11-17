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

const HOME_URLS: Record<string, string> = {
  "Netflix": "https://www.netflix.com",
  "Apple TV Store": "https://tv.apple.com",
  "YouTube": "https://www.youtube.com",
  "Amazon Video": "https://www.primevideo.com",
  "Amazon Prime Video": "https://www.primevideo.com",
  "Fandango At Home": "https://athome.fandango.com",
  "Google Play Movies": "https://play.google.com/store/movies",
  "Disney Plus": "https://www.disneyplus.com/",
  "HBO Max": "https://www.hbomax.com",
  "Plex" : "https://www.plex.tv",
  "fuboTV": "https://www.fubo.tv/",
  "FXNow": "https://fxnow.fxnetworks.com",
  "Starz": "https://www.starz.com/us/en/", 
  "Apple TV Amazon Channel" : "https://www.primevideo.com/",
};

export const AvailableOn = ({ platforms, className }: Props) => {
  const filteredPlatforms = platforms.filter(
    (platform) => platform.name in HOME_URLS
  );

    if (filteredPlatforms.length === 0) return null;

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
                {filteredPlatforms.map((platform) => {
                    const homeUrl = HOME_URLS[platform.name];

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