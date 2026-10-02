import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import clsx from "clsx";

interface NavLinksProps {
    onItemClick?: () => void;
}

const activeCallback = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.active);

export const NavLinks = ({ onItemClick }: NavLinksProps) => {
    return (
        <ol className={styles.list}>
            <li className={styles.item}>
                <NavLink
                    to={"/"}
                    className={activeCallback}
                    onClick={onItemClick}
                >
                    Home
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    to={"/catalog"}
                    className={activeCallback}
                    onClick={onItemClick}
                >
                    Catalog
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    className={clsx(styles.link, styles.linkAccent)}
                    to={"/"}
                    onClick={onItemClick}
                >
                    % Movie Picker ✨
                </NavLink>
            </li>
        </ol>
    );
};
