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
                {platforms.map((platform) => (
                    <li key={platform.id}>
                        <div
                            className={styles.logo}
                            title={platform.name}
                            role="img"
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
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};