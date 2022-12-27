/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a84ff",
        "bg-dark": "#1a1a1a",
        "bg-dimmed": "#2a2a2a",
        "text-dimmed": "#eff2f699",
      },
    },
  },
  plugins: [],
};
