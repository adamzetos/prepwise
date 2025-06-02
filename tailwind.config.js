/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors from Figma
        primary: '#1a4d8c',
        secondary: '#17b0a7',
        accent: '#ff9d5c',
        
        // Text colors
        'text-primary': '#1f2d3d',
        'text-secondary': '#6b7b8f',
        'text-muted': '#adaebc',
        
        // Background colors
        'bg-primary': '#ffffff',
        'bg-secondary': '#f7f9fc',
        'bg-tertiary': '#f5f7fa',
        
        // Border colors
        'border-primary': '#e8ecf0',
        'border-secondary': '#e5e7eb',
        'border-tertiary': '#ced4da',
        
        // Status colors
        success: '#3cb371',
        warning: '#ff9d5c',
        error: '#e74c3c',
        info: '#4f6fe5',
      },
      fontFamily: {
        // Extracted from Figma
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Custom spacing to match Figma
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
      },
    },
  },
  plugins: [],
}