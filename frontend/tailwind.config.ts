import type { Config } from "tailwindcss";

const brandPreset = require("../takedown-atlas-brand-starter-kit/tokens/tailwind.preset.cjs");

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [brandPreset],
  theme: {
    extend: {
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
