/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'spellbook': "url('https://static.wikia.nocookie.net/crossroads/images/f/f5/Grimoire_de_Ma%C3%AEtre.png/revision/latest?cb=20170325200219&path-prefix=fr')"
      },
    },
  },
  plugins: [],
}

