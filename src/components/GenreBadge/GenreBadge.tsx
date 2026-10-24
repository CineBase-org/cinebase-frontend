import clsx from "clsx";
import styles from "./GenreBadge.module.scss";

interface Props {
    genre: string;
    variant?: "solid" | "outline" | "accent";
    className?: string;
}

export const GenreBadge = ({ genre, variant = "solid", className }: Props) => {
    return (
        <span className={clsx(styles.badge, styles[variant], className)}>
            {genre}
        </span>
    );
};
