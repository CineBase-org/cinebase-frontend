import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { MainLayout } from "./layouts/MainLayout";
import { FilmPage } from "./pages/FilmPage";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<MainLayout />}
            >
                <Route
                    index
                    element={<HomePage />}
                />
                <Route
                    path="catalog"
                    element={<CatalogPage />}
                />
               <Route
                    path="movie/:id"
                    element={<FilmPage />}
                /> 
            </Route>
        </Routes>
    );
}

export default App;
