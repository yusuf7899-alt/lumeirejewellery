import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: {
          DEFAULT: "#0A0A0A",
          deep: "#050505",
          light: "#141414",
        },
        ivory: {
          DEFAULT: "#FAF8F5",
          warm: "#FFFDF9",
          muted: "#EDE8E1",
        },
        champagne: {
          DEFAULT: "#C7B77D",
          light: "#F0E8C6",
          dark: "#9E8B54",
          muted: "#716744",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F5EFD9",
          dark: "#B6A15D",
          accent: "#C5A880",
        },
        sand: "#EFECE6",
        charcoal: "#171615",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Didot", "Cinzel", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Plus Jakarta Sans", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.22em",
        "luxury-wide": "0.35em",
        "ultra-wide": "0.55em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
