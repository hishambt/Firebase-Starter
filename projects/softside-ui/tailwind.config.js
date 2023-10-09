/** @type {import('tailwindcss').Config} */

console.log('Building tailwind for library');

module.exports = {
	content: [__dirname + '/lib/ui/**/*.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [],
};
