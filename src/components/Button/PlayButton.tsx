import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "./Button"; 
import type { ButtonStyleProps } from "./buttonClasses";

import { getYouTubeEmbedUrl } from "../../utils/movie"; 
import { TrailerModal } from "../TrailerModal";

interface Props extends Omit<ButtonStyleProps, "isActive" | "disabled"> {
    trailerUrl?: string | null;
    label?: string;
    className?: string;
}

export const PlayButton = ({
    trailerUrl,
    label = "Play",
    variant = "primary",
    size,
    ...rest
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const embedUrl = getYouTubeEmbedUrl(trailerUrl);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                disabled={!embedUrl}
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
            </Button>

            {isOpen && embedUrl && (
                <TrailerModal
                    embedUrl={embedUrl}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};