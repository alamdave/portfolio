/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titlef: ["Clash Display", "sans-serif"],
        bodyf: ["Public Sans", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-pattern.svg')",
        "footer-texture": "url('/images/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
