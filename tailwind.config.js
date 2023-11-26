/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './page-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      xl: '1280px',
      smOnly: { max: '767.98px' },
      notXl: { max: '1279.98px' },
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '16px',
          sm: '16px',
          xl: '6px',
        },
      },

      colors: {
        white: '#F9F9F9',

        black: '#1E1E1E',
        lightGray: '#D9D9D9',

        red: '#E33E38',
      },
      fontFamily: {
        sans: ['Sofia Sans Semi Condensed', 'sans-serif'],
      },
      boxShadow: {},
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
};
