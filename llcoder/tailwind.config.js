/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', "sans-serif"],
      },
      colors: {
        primary: "#2881ad",

        //dark mode colors
        "dark-color-1": "#010409",
        "dark-color-2": "#161b22",
        "dark-color-3": "#1e2531",
        "dark-color-4": "#0d1117",
        "dark-color-5": "#212529",
        "dark-border-color": "#21262d",
        "dark-hover-color": "rgba(255, 255, 255, 0.05)",
        "dark-text-color-1": "#c9d1d9",
        "dark-text-color-2": "#565d65",
      },
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
    },
  },
  plugins: [],
};
