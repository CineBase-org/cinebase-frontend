import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "./contexts/WatchlistProvider";
import "./index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <WatchlistProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </WatchlistProvider>
    </StrictMode>,
);
