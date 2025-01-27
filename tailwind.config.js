/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#141414",
        customWhite: "#fcfce4",
      },
      fontFamily: {
        titlef: ["Clash Display", "sans-serif"],
        bodyf: ["Public Sans", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-pattern.svg')",
        "footer-texture": "url('/images/footer-texture.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        moveInCircle: "moveInCircle 20s reverse infinite",
        moveInCircle2: "moveInCircle 40s linear infinite",
        moveInCircle3: "moveInCircle 20s ease infinite",
        moveVertical: "moveVertical 30s ease infinite",
        moveHorizontal: "moveHorizontal 40s ease infinite",
      },
      keyframes: {
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
      },
    },
  },
  plugins: [],
};
