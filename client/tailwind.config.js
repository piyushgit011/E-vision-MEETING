/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        siteBg: "#040c21",
        siteBlue: "#034694",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        logo: ["Rubik Dirt", "cursive"],
      },
      gridTemplateColumns: {
        15: "repeat(auto-fit, minmax(400px, 1fr))",
        16: "repeat(auto-fit, minmax(320px, 1fr))",
      },
    },
  },
  plugins: [],
};
