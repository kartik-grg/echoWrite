/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'primary-text': 'var(--color-text-primary)',
        'secondary-text': 'var(--color-text-secondary)',
        'primary-bg': 'var(--color-bg-primary)',
        'secondary-bg': 'var(--color-bg-secondary)',
        'accent-hover': 'var(--color-accent-hover)',
        'border-color': 'var(--color-border)',
        'card-bg': 'var(--color-card-bg)',
        'button-primary': 'var(--color-button-primary)',
        'button-secondary': 'var(--color-button-secondary)',
      },
    },
  },
  plugins: [],
}

