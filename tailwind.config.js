/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#7d0f22', light: '#a8203a', accent: '#b3122b', deep: '#5c0a19' },
        gold: { DEFAULT: '#f0a202', light: '#ffc44d' },
        good: '#1f9d55',
        cream: '#fdf8f3',
        ink: '#1e2733',
        muted: '#6b7684',
        line: '#ecdfd3',
      },
      fontFamily: { sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'] },
      boxShadow: {
        soft: '0 1px 3px rgba(20,25,35,.05), 0 10px 30px rgba(125,15,34,.06)',
        lift: '0 10px 30px rgba(125,15,34,.22)',
      },
    },
  },
  plugins: [],
};
