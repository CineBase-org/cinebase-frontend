import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            // Backend doesn't send CORS headers, so dev requests are proxied
            // same-origin instead of hitting it directly from the browser.
            "/api": {
                target: process.env.VITE_API_URL ?? "http://63.186.121.100",
                changeOrigin: true,
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
          @use "@/styles/typography" as *;
        `,
            },
        },
    },
});
