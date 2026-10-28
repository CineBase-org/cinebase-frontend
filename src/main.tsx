import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 1. Додаємо імпорт
import { WatchlistProvider } from "./contexts/WatchlistProvider";
import "./index.scss";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      staleTime: 5 * 60 * 1000, 
    },
  },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WatchlistProvider>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </WatchlistProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
);