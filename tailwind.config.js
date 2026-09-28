/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F3A",
          light: "#163A63",
        },
        blue: {
          DEFAULT: "#1769E0",
        },
        gold: {
          DEFAULT: "#D9A441",
          light: "#F2C76E",
        },
        surface: "#F5F7FA",
        ink: "#172033",
        muted: "#667085",
        success: "#12B76A",
        danger: "#F04438",
      },
      fontFamily: {
        sans: ["'Inter'", "'Segoe UI'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(11, 31, 58, 0.08)",
        card: "0 2px 12px rgba(11, 31, 58, 0.06)",
        lift: "0 12px 32px rgba(11, 31, 58, 0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
