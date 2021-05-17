
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#D85830',
      secondary: '#4F46E5',
      white: '#FFFFFF',
      black: '#050505',
      gray: {
        light: '#F9FAFB',
        DEFAULT: '#D1D5DB',
        dark: '#374151',
      },
      red: {
        light: '#FE2B02',
        DEFAULT: '#DC2626',
        dark: '#B91C1C',
      },
      blue: {
        light: '#EFF6FF',
        DEFAULT: '#1D4ED8',
        dark: '#1E3A8A',
      },
      indigo: {
        light: '#EEF2FF',
        DEFAULT: '#4F46E5',
        dark: '#3730A3',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
