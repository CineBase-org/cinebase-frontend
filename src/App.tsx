import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { MoviePage } from "./pages/MoviePage";
import { MainLayout } from "./layouts/MainLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/Route";
import { UserPage } from "./pages/UserPage";


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
                    element={<MoviePage />}
                />
                <Route
                    path="login"
                    element={<Login />}
                />
                <Route
                    path="register"
                    element={<Register />}
                />

                <Route element={<ProtectedRoute />}>
                <Route path="user" element={<UserPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
