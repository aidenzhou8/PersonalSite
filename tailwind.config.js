/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        theme: {
          bg: "var(--theme-bg)",
          "bg-alt": "var(--theme-bg-alt)",
          text: "var(--theme-text)",
          "text-muted": "var(--theme-text-muted)",
          "text-dim": "var(--theme-text-dim)",
          accent: "var(--theme-accent)",
          "accent-muted": "var(--theme-accent-muted)",
          border: "var(--theme-border)",
        },
      },
    },
  },
  plugins: [],
}
