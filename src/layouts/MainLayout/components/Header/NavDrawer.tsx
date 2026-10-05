import { createPortal } from "react-dom";
import styles from "./Header.module.scss";
import { NavLinks } from "./NavLinks";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const NavDrawer = ({ isOpen, onClose }: Props) => {
    if (!isOpen) {
        return null;
    }

    return createPortal(
        <nav className={styles.mobileNav}>
            <NavLinks onItemClick={onClose} />
        </nav>,
        document.body,
    );
};
