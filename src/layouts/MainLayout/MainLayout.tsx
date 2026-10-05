import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import styles from "./MainLayout.module.scss";

export const MainLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer className={styles.footer} />
        </div>
    );
};
