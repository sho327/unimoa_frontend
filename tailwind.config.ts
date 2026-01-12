import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "Noto Sans JP", "sans-serif"],
            },
            colors: {
                background: "oklch(var(--b2))",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    "primary": "oklch(0.73 0.11 162)", // --p
                    "base-200": "oklch(0.95 0.006 162)", // --b2
                },
            },
        ],
    },
};
export default config;
