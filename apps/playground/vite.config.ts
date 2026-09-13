import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Workspace consumes the `source` condition (see packages/ui package.json).
    conditions: ["module", "browser", "development|production", "source"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
