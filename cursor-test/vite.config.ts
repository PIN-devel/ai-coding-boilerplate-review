/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const srcAlias = (segment: string) => fileURLToPath(new URL(`./src/${segment}`, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@app": srcAlias("app"),
      "@pages": srcAlias("pages"),
      "@widgets": srcAlias("widgets"),
      "@features": srcAlias("features"),
      "@entities": srcAlias("entities"),
      "@shared": srcAlias("shared"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/shared/lib/test/setup.ts",
  },
});
