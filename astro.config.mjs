// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const LATIN_EXT =
  "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  fonts: [
    {
      name: "Public Sans",
      cssVariable: "--font-public-sans",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/public-sans-latin.woff2"],
            unicodeRange: [LATIN],
          },
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/public-sans-latin-ext.woff2"],
            unicodeRange: [LATIN_EXT],
          },
        ],
      },
    },
    {
      name: "Crimson Pro",
      cssVariable: "--font-crimson-pro",
      provider: fontProviders.local(),
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            weight: "200 900",
            style: "normal",
            src: ["./src/assets/fonts/crimson-pro-latin.woff2"],
            unicodeRange: [LATIN],
          },
          {
            weight: "200 900",
            style: "normal",
            src: ["./src/assets/fonts/crimson-pro-latin-ext.woff2"],
            unicodeRange: [LATIN_EXT],
          },
        ],
      },
    },
  ],
  // Binds the IPv4 loopback, which is what a Tailscale Funnel proxies to.
  server: { host: "127.0.0.1" },
  vite: {
    build: { cssTarget: "safari15.4" },
    // Lets the dev server answer requests proxied from a Tailscale tailnet.
    server: { allowedHosts: [".ts.net"] },
  },
});
