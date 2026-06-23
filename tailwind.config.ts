import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        border: "hsl(var(--border))",
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 0.25rem)", sm: "calc(var(--radius) - 0.5rem)" },
      container: { center: true, padding: { DEFAULT: "1rem", sm: "2rem" }, screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" } },
    },
  },
  plugins: [],
};
export default config;
