import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import { ChevronUp } from "lucide-react";

interface Props {
    className?: string;
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

export const Footer = ({ className }: Props) => {
    return (
        <footer className={`${styles.footer} ${className ?? ""}`.trim()}>
            <Link
                to={"/"}
                className={styles.logo}
            >
                CINEBASE
            </Link>

            <Link
                to={"/contact-us"}
                className={styles.contact}
            >
                Contact us
            </Link>

            <Link
                to={"/about"}
                className={styles.about}
            >
                About CineBase
            </Link>

            <div className={styles.backToTop}>
                <button
                    onClick={scrollToTop}
                    className={styles.backToTopButton}
                >
                    <span className={styles.backToTopText}>Back to top</span>

                    <div className={styles.iconWrapper}>
                        <ChevronUp
                            size={16}
                            aria-hidden="true"
                        />
                    </div>
                </button>
            </div>
        </footer>
    );
};
