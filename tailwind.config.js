/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00B074",
          "primary-content": "#00B074",
          secondary: "#DF0404",
          "secondary-content": "#DF0404",
          accent: "#00E26B",
          "accent-content": "#00E26B",
          neutral: "#414141",
          "neutral-content": "#666666",
          "base-100": "#ffffff",
          "base-200": "#f7f8fa",
          "base-300": "#fbfbfb",
          "base-400": "#f8f8f8",
          "base-content": "#414141",
          "text-base": "#FF4757",
          info: "#312e91",
          success: "#009485",
          warning: "#ff9900",
          error: "#e53e3e",
          "info-content": "#5B5B5B",
        },
      },
    ],
  },
};
