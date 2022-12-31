/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "bg-dark": "#1a1a1a",
        // "bg-dimmed": "#2a2a2a",

        // primary: "#dbff00",
        // secondary: "#363073",
        // "bg-dark": "#000000",
        // "bg-dimmed": "#1a1a1a",

        primary: "#eb5e28",
        secondary: "#363073",
        "bg-dark": "#252422",
        "bg-dimmed": "#403d39",
        "text-dimmed": "#eff2f699",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
