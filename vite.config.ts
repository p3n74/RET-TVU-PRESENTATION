import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built site works from any subpath (e.g. opening dist/ locally
// or serving from a project folder at a conference).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
