import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerenderPlugin from "./vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && prerenderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          // Heavy 3D stack — load only where used
          if (
            id.includes("/three/") ||
            id.includes("\\three\\") ||
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          ) {
            return "three";
          }

          // Radix UI primitives
          if (id.includes("@radix-ui/")) return "radix";

          // Icons
          if (id.includes("lucide-react")) return "icons";

          // Forms / validation
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform/") ||
            id.includes("/zod/")
          ) {
            return "forms";
          }

          // Charts (recharts is heavy)
          if (id.includes("recharts") || id.includes("/d3-")) return "charts";

          // Carousel
          if (id.includes("embla-carousel")) return "carousel";

          // Supabase
          if (id.includes("@supabase/")) return "supabase";

          // Data fetching
          if (id.includes("@tanstack/")) return "query";

          // Routing + helmet
          if (id.includes("react-router") || id.includes("react-helmet-async")) {
            return "router";
          }

          // React core stays in the main vendor chunk by default
          return "vendor";
        },
      },
    },
  },
}));
