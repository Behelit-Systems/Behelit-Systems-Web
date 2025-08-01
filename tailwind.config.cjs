/*
// =========================================================
//  File: tailwind.config.cjs
//
//  This is the Tailwind CSS configuration file.
//  It's used to customize Tailwind's default theme and plugins.
// =========================================================
*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      // Define a custom font family to be used throughout the project
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Include the Tailwind Typography plugin for styling rich text
    require('@tailwindcss/typography'),
  ],
}
