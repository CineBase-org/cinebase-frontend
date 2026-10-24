import clsx from "clsx";

import styles from "./AvailableOn.module.scss";

export interface Platform {
    name: string;
    /** Short text shown while no logo file is set. */
    short: string;
    /** Logo image (import it from src/assets/platforms). */
    logoSrc?: string;
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
                    <li key={platform.name}>
                        <div
                            className={styles.logo}
                            title={platform.name}
                            role="img"
                            aria-label={platform.name}
                        >
                            {platform.logoSrc ?
                                <img
                                    src={platform.logoSrc}
                                    alt=""
                                />
                            :   platform.short}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
