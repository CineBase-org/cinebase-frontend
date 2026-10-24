import { useId, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "./Button";
import type { ButtonStyleProps } from "./buttonClasses";
import { useWatchlist } from "../../contexts/useWatchlist";

const visuallyHidden = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
} as const;

interface Props extends Omit<ButtonStyleProps, "isActive" | "disabled"> {
    movieId?: number;
    defaultAdded?: boolean;
    label?: string;
    addedLabel?: string;
    onToggle?: (isAdded: boolean) => void;
}

export const AddButton = ({
    movieId,
    defaultAdded = false,
    label = "Watchlist",
    addedLabel,
    onToggle,
    variant = "secondary",
    size,
    ...rest
}: Props) => {
    const { movieIds, hasError, toggleMovie } = useWatchlist();
    const iconSize = size === "sm" ? 12 : 14;
    const statusId = useId();
    const [localIsAdded, setLocalIsAdded] = useState(defaultAdded);
    const isAdded =
        movieId === undefined ? localIsAdded : movieIds.includes(movieId);

    const handleClick = () => {
        if (movieId === undefined) {
            const next = !isAdded;
            setLocalIsAdded(next);
            onToggle?.(next);
            return;
        }

        if (toggleMovie(movieId)) onToggle?.(!isAdded);
    };

    return (
        <>
            <Button
                variant={variant}
                size={size}
                isActive={isAdded}
                aria-pressed={isAdded}
                aria-describedby={hasError ? statusId : undefined}
                title={
                    hasError ?
                        "Could not access the watchlist. Your change was not saved."
                    :   undefined
                }
                onClick={handleClick}
                icon={
                    isAdded ?
                        <Check size={iconSize} />
                    :   <Plus size={iconSize} />
                }
                {...rest}
            >
                {isAdded ? (addedLabel ?? label) : label}
            </Button>
            {hasError && (
                <span
                    id={statusId}
                    role="status"
                    aria-live="polite"
                    style={visuallyHidden}
                >
                    Could not access the watchlist. Your change was not saved.
                </span>
            )}
        </>
    );
};
