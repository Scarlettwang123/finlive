/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        gold: {
          50: "#FFFBF0",
          100: "#FDF3D9",
          200: "#F7E2A0",
          300: "#F0CF66",
          400: "#E8BD3B",
          500: "#D4AF37",
          600: "#B8942A",
          700: "#947420",
          800: "#6E5516",
          900: "#4A370D",
        },
        navy: {
          50: "#F0F5FF",
          100: "#D9E4FF",
          200: "#A5C1FF",
          300: "#6B9AFF",
          400: "#3B75F0",
          500: "#1A4DCF",
          600: "#0F3A9E",
          700: "#0A2870",
          800: "#0A1628",
          900: "#060E1A",
          950: "#03070F",
        },
      },
      fontFamily: {
        serif: ['"Songti SC"', '"SimSun"', '"Noto Serif SC"', "serif"],
        sans: ['"PingFang SC"', '"Microsoft YaHei"', "-apple-system", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)",
        "gold-gradient":
          "linear-gradient(135deg, #F0CF66 0%, #D4AF37 50%, #B8942A 100%)",
        "navy-gradient":
          "linear-gradient(180deg, #0A1628 0%, #060E1A 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
