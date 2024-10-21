import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig(({ command }) => {
    const isProduction = command === "build";
    const enableFastRefresh = !isProduction;

    return {
        plugins: [
            laravel(["resources/js/app.tsx"]),
            react({
                fastRefresh: enableFastRefresh,
            }),
            tailwindcss("./tailwind.config.js"),
        ],
        server: {
            host: "app",
            hmr: {
                clientPort: 5173,
                host: "localhost",
                protocol: "ws",
            },
            port: 5173,
            watch: {
                usePolling: true,
            },
        },
        build: {
            outDir: "public/build",
            rollupOptions: {
                input: "resources/js/app.tsx",
            },
        },
    };
});
