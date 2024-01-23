/** @type {import('tailwindcss').Config} */

console.log('Building tailwind for library');

module.exports = {
	content: [__dirname + '/lib/**/*.component.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};
