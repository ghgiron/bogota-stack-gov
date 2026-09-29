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
        primary: {
          DEFAULT: "#CC0E35",
          hover: "#A60B2B",
          dark: "#840922",
          light: "#FDF2F4",
        },
        secondary: {
          DEFAULT: "#FAB62D",
          hover: "#E5A323",
          dark: "#BF871B",
          light: "#FEF8EA",
        },
        tertiary: {
          DEFAULT: "#3366CC",
          hover: "#2852A3",
          dark: "#1F3F7E",
          light: "#EEF4FD",
        },
        // Tokens Stitch / DESIGN_4.md
        "primary-container": "#CC0E35",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#FFDEDD",
        "secondary-container": "#FAB62D",
        "on-secondary-container": "#6E4C00",
        "tertiary-container": "#2E62C8",
        "on-tertiary-container": "#DFE5FF",
        "tertiary-fixed": "#D9E2FF",
        "on-tertiary-fixed": "#001946",
        "secondary-fixed": "#FFDEAB",
        "on-secondary-fixed": "#271900",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F6F3F2",
        "surface-container": "#F0EDED",
        "surface-container-high": "#EAE8E7",
        "surface-container-highest": "#E4E2E1",
        "on-surface": "#1B1C1C",
        "on-surface-variant": "#5C3F3F",
        "outline-variant": "#E5BDBC",
        "text-main": "#1B1C1C",
        "text-muted": "#5C3F3F",
        "bg-main": "#FBF9F8",
        surface: "#FBF9F8",
        background: "#FBF9F8",
      },
      borderRadius: {
        btn: "5px",
        card: "15px",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-work-sans)", "sans-serif"],
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [],
};

export default config;
