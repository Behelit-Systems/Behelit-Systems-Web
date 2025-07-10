/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', // Astro, HTML, JS, JSX, Markdown, MDX, TS, TSX files
    './public/**/*.html', // Any HTML files in the public directory
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter font
      },
    },
  },
  plugins: [],
}

