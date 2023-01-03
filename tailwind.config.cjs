/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7400b8",
        secondary: "#64dfdf",

        "bg-dark": "#101010",
        "bg-dimmed": "#1e1c1a",
        "text-dimmed": "#eff2f6aa",

        // "bg-dark": "#1a1a1a",
        // "bg-dimmed": "#2a2a2a",
        // primary: "#dbff00",
        // secondary: "#363073",
        // "bg-dark": "#000000",
        // "bg-dimmed": "#1a1a1a",
        // "bg-dark": "#252422",
        // primary: "#eb5e28",
        // secondary: "#df2935",
        // "bg-dark": "#1e1c1a",
        // "bg-dimmed": "#403d39",
        // "text-dimmed": "#eff2f699",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
