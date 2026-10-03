import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import { Bell, CircleUser, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavDrawer } from "./NavDrawer";
import { NavLinks } from "./NavLinks";

import styles from "./Header.module.scss";

interface Props {
    className?: string;
}

export const Header = ({ className }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const onClose = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        const tabletBreakpoint = window.matchMedia("(min-width: 768px)");
        const closeDrawerOnTablet = (event: MediaQueryListEvent) => {
            if (event.matches) {
                onClose();
            }
        };

        tabletBreakpoint.addEventListener("change", closeDrawerOnTablet);
        return () =>
            tabletBreakpoint.removeEventListener("change", closeDrawerOnTablet);
    }, [onClose]);

    const handleSearchSubmit = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();
            if (!searchQuery.trim()) return;

            //
        },
        [searchQuery],
    );

    return (
        <header className={`${styles.header} ${className ?? ""}`.trim()}>
            <button
                className={isOpen ? styles.xButton : styles.menuButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                {isOpen ?
                    <X size={16} />
                :   <Menu size={24} />}
            </button>

            <div className={styles.leftGroup}>
                <Link
                    to={"/"}
                    className={styles.logo}
                >
                    CINEBASE
                </Link>

                <nav className={styles.nav}>
                    <NavLinks onItemClick={onClose} />
                </nav>
            </div>

            <div className={styles.actionsGroup}>
                <button
                    className={styles.searchButton}
                    aria-label="Toggle mobile search"
                >
                    <Search size={22} />
                </button>

                <form
                    className={styles.searchInputWrapper}
                    onSubmit={handleSearchSubmit}
                    role="search"
                >
                    <input
                        className={styles.searchInput}
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search movies"
                    />
                </form>

                <button
                    className={styles.bellButton}
                    aria-label="Notifications"
                >
                    <Bell size={22} />
                </button>

                <Link
                    to={"/user"}
                    className={styles.userLink}
                    aria-label="User profile"
                >
                    <CircleUser size={22} />
                </Link>
            </div>
            <NavDrawer
                isOpen={isOpen}
                onClose={onClose}
            />
        </header>
    );
};
