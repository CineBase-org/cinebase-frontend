import clsx from "clsx";

import styles from "./FeaturedMovie.module.scss";

interface Props {
    className?: string;
}

export const FeaturedMovieSkeleton = ({ className }: Props) => {
    return (
        <div
            className={clsx(styles.skeleton, className)}
            role="status"
            aria-label="Loading featured movie"
        />
    );
};
