import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ mode }) => ({
  base: "/SimpleProject/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: "dist/index.html", dest: ".", rename: "404.html" }],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
