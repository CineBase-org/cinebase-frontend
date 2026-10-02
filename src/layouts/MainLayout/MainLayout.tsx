import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import styles from "./MainLayout.module.scss";

export const MainLayout = () => {
  return (
      <div className={styles.wrapper}>
          <header className={styles.header}>
              <Header />
          </header>
          <main>
              <Outlet />
          </main>
          <footer>
              <Footer />
          </footer>
      </div>
  );
};
