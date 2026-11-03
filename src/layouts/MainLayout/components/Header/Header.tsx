import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Bell, CircleUser, LogIn, Menu, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { NavDrawer } from "./NavDrawer";
import { NavLinks } from "./NavLinks";

import styles from "./Header.module.scss";
import { useAuth } from "../../../../contexts/AuthContext";

interface Props {
    className?: string;
}

export const Header = ({ className }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onClose = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        const tabletBreakpoint = window.matchMedia("(min-width: 768px)");
        const closeDrawerOnTablet = (event: MediaQueryListEvent) => {
            if (event.matches) {
                onClose();
                setIsSearchActive(false); 
            }
        };

        tabletBreakpoint.addEventListener("change", closeDrawerOnTablet);
        return () =>
            tabletBreakpoint.removeEventListener("change", closeDrawerOnTablet);
    }, [onClose]);

    const toggleSearch = () => {
        setIsSearchActive((prev) => {
            const newState = !prev;
            if (newState) {
              setTimeout(() => searchInputRef.current?.focus(), 50);
            }
            return newState;
        });
    };

    const handleSearchSubmit = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();

            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) return;

            navigate(`/catalog?search=${encodeURIComponent(trimmedQuery)}`);
            setSearchQuery('');
            onClose();
            setIsSearchActive(false); 
        },
        [searchQuery, navigate, onClose],
    );

    return (
        <header className={`${styles.header} ${className ?? ""}`.trim()}>
            <button
                className={clsx(
                    isOpen ? styles.xButton : styles.menuButton,
                    isSearchActive && styles.hideOnMobile
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                {isOpen ? <X size={16} /> : <Menu size={24} />}
            </button>

            <div className={clsx(styles.leftGroup, isSearchActive && styles.hideOnMobile)}>
                <Link to={"/"} className={styles.logo}>
                    CINEBASE
                </Link>

                <nav className={styles.nav}>
                    <NavLinks onItemClick={onClose} />
                </nav>
            </div>

            <div className={clsx(styles.actionsGroup, isSearchActive && styles.searchExpanded)}>
                
                <form
                    className={clsx(styles.searchInputWrapper, isSearchActive && styles.active)}
                    onSubmit={handleSearchSubmit}
                    role="search"
                >
                    <input
                        ref={searchInputRef}
                        className={styles.searchInput}
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search movies"
                    />
                </form>

                <button
                    type="button"
                    className={styles.searchButton}
                    aria-label="Toggle mobile search"
                    onClick={toggleSearch}
                >
                    {isSearchActive ? <X size={22} /> : <Search size={22} />}
                </button>

                <button
                    className={clsx(styles.bellButton, isSearchActive && styles.hideOnMobile)}
                    aria-label="Notifications"
                >
                    <Bell size={22} />
                </button>

                {isAuthenticated ? (
                  <Link
                    to={"/user"}
                    className={clsx(styles.userLink, isSearchActive && styles.hideOnMobile)}
                    aria-label="User profile"
                  >
                    <CircleUser size={22} />
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className={clsx(styles.userLink, isSearchActive && styles.hideOnMobile)}
                    aria-label="Log in"
                  >
                    <LogIn size={22} />
                  </Link>
                )}
                
            </div>
            <NavDrawer isOpen={isOpen} onClose={onClose} />
        </header>
    );
};
