/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', "sans-serif"],
      },
      colors: {},
      width: {
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        68: "17rem",
        72: "18rem",
        76: "19rem",
        80: "20rem",
        84: "21rem",
        88: "22rem",
        92: "23rem",
        96: "24rem",
        100: "25rem",
      },
      animation: {
        "fade-in": "fade-in 0.25s linear",
        scale: "scale 0.25s linear",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scale: {
          "0%": { transform: "scale(.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
