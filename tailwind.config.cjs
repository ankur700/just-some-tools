/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: [
      'light',
      'dark',
      'corporate',
      'retro',
      'dracula',
      'lemonade',
      'dim'
    ]
  },
	theme: {
		extend: {}
	},
  darkMode: ['class'],
	plugins: [require('daisyui')],
};

module.exports = config;
