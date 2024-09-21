/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#29C7CA',
          DEFAULT: '#29C7CA',
          dark: '#2BADAF',
          shadow: '#355657'
        },
        secondary: {
          light: '#111828',
          DEFAULT: '#111828',
          dark: '#111828',
        },
        tertiary: {
          light: '#28A2CC',
          DEFAULT: '#28A2CC',
          dark: '#2187A9',
        },
        white: {
          light: '#FFFFFF',
          DEFAULT: '#FFFFFF',
          dark: '#FFFFFF',
        },
        background: {
          light: '#F9FAFB',
          DEFAULT: '#F9FAFB',
          dark: '#2D2E33',
        },
        text: {
          light: '#2D2E33',
          DEFAULT: '#1F2937',
          dark: '#FFFFFF',
        },
        success: {
          light: '#13CD89',
          DEFAULT: '#13CD89',
          dark: '#12B277',
        },
        error: {
          light: '#CD3B52',
          DEFAULT: '#CD3B52',
          dark: '#A02235',
        },
        button: {
          primary: '#29C7CA',
          secondary: '#3b82f6',
          DEFAULT: '#28A2CC',
        },
      },
    },
  },
  plugins: [],
}