import { useEffect, useId, useRef, useState } from "react";
import { Check, Upload } from "lucide-react";
import { Button } from "./Button";
import type { ButtonStyleProps } from "./buttonClasses";

interface Props extends Omit<ButtonStyleProps, "isActive" | "disabled"> {
    title: string;
    /** Defaults to the current page URL. */
    url?: string;
    label?: string;
    showIcon?: boolean;
}

export const ShareButton = ({
    title,
    url,
    label = "Share",
    variant = "secondary",
    size,
    showIcon = true,
    ...rest
}: Props) => {
    const iconSize = size === "sm" ? 12 : 14;
    const [isCopied, setIsCopied] = useState(false);
    const [shareFailed, setShareFailed] = useState(false);
    const timerRef = useRef<number | undefined>(undefined);
    const statusId = useId();

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const handleShare = async () => {
        const shareUrl = url ?? window.location.href;

        setShareFailed(false);

        if (typeof navigator.share === "function") {
            try {
                await navigator.share({ title, url: shareUrl });
                setIsCopied(false);
                return;
            } catch (error: unknown) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }
            }
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            window.clearTimeout(timerRef.current);
            timerRef.current = window.setTimeout(
                () => {
                    setIsCopied(false);
                    setShareFailed(false);
                },
                2000,
            );
        } catch (error: unknown) {
            console.error("Failed to share or copy the link", error);
            setIsCopied(false);
            setShareFailed(true);
        }
    };

    return (
        <>
            <Button
                variant={variant}
                size={size}
                onClick={handleShare}
                aria-describedby={shareFailed ? statusId : undefined}
                title={
                    shareFailed ? "Could not share or copy the link." : undefined
                }
                icon={
                    !showIcon ? undefined
                    : isCopied ?
                        <Check size={iconSize} />
                    :   <Upload size={iconSize} />
                }
                {...rest}
            >
                {isCopied ? "Link copied" : label}
            </Button>
            {shareFailed && (
                <span
                    id={statusId}
                    role="status"
                    aria-live="polite"
                    style={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                    }}
                >
                    Could not share or copy the link.
                </span>
            )}
        </>
    );
};
