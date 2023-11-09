import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://andrewmosh.github.io/english_dictionary",
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
});
