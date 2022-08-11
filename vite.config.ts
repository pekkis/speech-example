import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      devOptions: {
        enabled: true
        /* other options */
      },
      includeAssets: [
        "favicon-32x32.png",
        "favicon-16x16.png",
        "robots.txt",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "Kvaak",
        short_name: "Kvaak",
        description: "An ERP for ducks",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: "#ffff00",
        background_color: "#ffff00",
        display: "standalone"
      }
    })
  ]
});
