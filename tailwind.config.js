/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056B3', // Bleu Roi Profond
          light: '#E3F2FD',   // Bleu Très Clair
        },
        secondary: {
          DEFAULT: '#64748B', // Gris Moyen
          dark: '#1E293B',    // Gris Foncé / Bleu Nuit
        },
        background: {
          DEFAULT: '#FFFFFF', // Blanc Pur
          alt: '#F8FAFC',     // Blanc Cassé
        },
        status: {
          danger: '#EF4444',  // Rouge
          success: '#10B981', // Vert
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
