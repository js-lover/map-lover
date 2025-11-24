/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],


  styledComponents: {
    Layout: { className: true },
    Card: { className: true },
    Text: { className: true },
    Button: { className: true }, // istersen diğer componentleri de ekleyebilirsin
  },




};
