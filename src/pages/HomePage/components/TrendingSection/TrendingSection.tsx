import { Fragment } from "react";

import { useTrendingFilms } from "../../hooks/useTrendingFilms";
import { PickerCallout } from "./PickerCallout";
import { TrendingCard } from "./TrendingCard";

import styles from "./TrendingSection.module.scss";
import useEmblaCarousel from "embla-carousel-react";

const SKELETON_COUNT = 4;
/** The movie picker promo takes the 4th slot, like in the design. */
const CALLOUT_INDEX = 3;

export const TrendingSection = () => {
    const { films, isLoading, error } = useTrendingFilms();

    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
    });

    return (
        <section
            className={styles.section}
            aria-labelledby="trending-title"
        >
            <div className={styles.header}>
                <h2
                    id="trending-title"
                    className={styles.title}
                >
                    Top Rated Movies
                </h2>
            </div>

            {error && (
                <p className={styles.status}>
                    Couldn't load trending movies right now.
                </p>
            )}

            {!error && (
                <div
                    ref={emblaRef}
                    className={styles.embla}
                >
                    <ul className={styles.container}>
                        {isLoading ?
                            Array.from(
                                { length: SKELETON_COUNT },
                                (_, index) => (
                                    <li
                                        key={index}
                                        className={styles.slide}
                                    >
                                        <div className={styles.skeletonCard} />
                                    </li>
                                ),
                            )
                        :   <>
                                {films.map((film, index) => (
                                    <Fragment key={film.id}>
                                        {index === CALLOUT_INDEX && (
                                            <li className={styles.slide}>
                                                <PickerCallout />
                                            </li>
                                        )}
                                        <li className={styles.slide}>
                                            <TrendingCard film={film} />
                                        </li>
                                    </Fragment>
                                ))}
                                {films.length <= CALLOUT_INDEX && (
                                    <li className={styles.slide}>
                                        <PickerCallout />
                                    </li>
                                )}
                            </>
                        }
                    </ul>
                </div>
            )}
        </section>
    );
};
