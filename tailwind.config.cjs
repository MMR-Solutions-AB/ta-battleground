/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dbff00",
        secondary: "#363073",
        // "bg-dark": "#1a1a1a",
        // "bg-dimmed": "#2a2a2a",
        "bg-dark": "#000000",
        "bg-dimmed": "#1a1a1a",
        "text-dimmed": "#eff2f699",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
