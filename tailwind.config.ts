import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['var(--font-publicsans)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        grey300: "var(--font-grey-300)"
      },
      backgroundColor: {
        backgroundc:"var(--background)",
      }
    },
  },
  plugins: [],
} satisfies Config;


