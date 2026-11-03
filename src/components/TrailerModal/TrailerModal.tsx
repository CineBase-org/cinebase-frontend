import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./TrailerModal.module.scss";

interface Props {
    embedUrl: string;
    title?: string;
    onClose: () => void;
}

export const TrailerModal = ({ embedUrl, title = "Trailer", onClose }: Props) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button 
                    type="button" 
                    className={styles.closeBtn} 
                    onClick={onClose}
                    aria-label="Close trailer"
                >
                    <X size={24} />
                </button>

                <div className={styles.iframeWrapper}>
                    <iframe
                        src={embedUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};