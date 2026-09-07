import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8090,
    watch: {
      ignored: ['**/*.mp4', '**/node_modules/**', '**/.git/**'],
    },
    hmr: {
      overlay: false,
    },
    proxy: {
      // Obrázky hostované u Lovable (soubory *.asset.json) se v lokálním
      // náhledu načtou z produkčního webu, aby náhled odpovídal realitě.
      "/__l5e": {
        target: "https://radek-vetrovsky.cz",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
  },
}));
