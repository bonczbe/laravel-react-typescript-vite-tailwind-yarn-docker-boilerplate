import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from 'tailwindcss';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const enableFastRefresh = !isProduction;

  return {
    plugins: [
      laravel(["resources/js/app.jsx"]),
      react({
        fastRefresh: enableFastRefresh,
      }),
      tailwindcss('./tailwind.config.js')
    ],
    build: {
      outDir: "public/build",
      rollupOptions: {
        input: "resources/js/app.jsx",
      },
    },
  };
});