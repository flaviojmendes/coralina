/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        theme: "'Roboto Slab', serif",
        action: "'Roboto', sans-serif",
        handwritten: '"Chilanka", cursive',
        title: '"Source Serif Pro", serif',
      },
      colors: {
        purple: "#3C3134",
        brown: "#C5B495",
        yellow: "#D9C197",
        green: "#9BAA7E",
        darkYellow: "#8C7A56",

        themeLight:"#f3f8fc",
        themeBackground: "#10001e",
        themeShadeText: "#1c1447",
        themeAccent: "#f96165",
        themeSecondary: "#6759db",
        themeText: "#f5bd4b",
        themeTextSecondary: "#67eaa2"
        // https://huemint.com/website-3/#palette=10001e-1c1447-f5bd4b-67eaa2-f96165-6759db

      },
    },
  },
  plugins: [],
};
