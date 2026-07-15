/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Брендинг ZenAir (см. PLAN.md)
        brand: '#3b82f6',
        menu: '#a4c7ff',
        panel: '#e8e8e8',
      },
    },
  },
  plugins: [],
};
