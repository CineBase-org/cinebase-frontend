import { useCallback, useEffect, useState } from "react";
import { Bell, CircleUser, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavDrawer } from "./NavDrawer";
import { NavLinks } from "./NavLinks";

import styles from "./Header.module.scss";

export const Header = () => {
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

    return (
        <div className={styles.header}>
            {!isOpen ?
                <button
                    className={styles.menuButton}
                    onClick={() => setIsOpen(true)}
                >
                    <Menu size={24} />
                </button>
            :   <button
                    onClick={onClose}
                    className={styles.XButton}
                >
                    <X size={16} />
                </button>
            }

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
                <button className={styles.searchButton}>
                    <Search size={22} />
                </button>

                <div className={styles.searchInputWrapper}>
                    <input
                        className={styles.searchInput}
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className={styles.bellButton}>
                    <Bell size={22} />
                </button>

                <Link
                    to={"/user"}
                    className={styles.userLink}
                >
                    <CircleUser size={22} />
                </Link>
            </div>
            <NavDrawer
                isOpen={isOpen}
                onClose={onClose}
            />
        </div>
    );
};
