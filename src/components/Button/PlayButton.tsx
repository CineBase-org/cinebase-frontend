import { Play } from "lucide-react";
import { LinkButton } from "./LinkButton";
import type { ButtonStyleProps } from "./buttonClasses";

interface Props extends Omit<ButtonStyleProps, "isActive" | "disabled"> {
    /** Trailer URL from the API. Button is disabled when it is missing. */
    trailerUrl?: string | null;
    label?: string;
}

export const PlayButton = ({
    trailerUrl,
    label = "Play",
    variant = "primary",
    size,
    ...rest
}: Props) => {
    return (
        <LinkButton
            href={trailerUrl ?? undefined}
            disabled={!trailerUrl}
            variant={variant}
            size={size}
            icon={
                <Play
                    size={size === "sm" ? 12 : 14}
                    fill="currentColor"
                />
            }
            {...rest}
        >
            {label}
        </LinkButton>
    );
};
