/** @type {import('tailwindcss').Config} */

var content = './src/**/*.{html,ts}';

if (process.env.NODE_ENV && process.env.NODE_ENV.includes('production')) {
	console.log('\x1b[33m\n -----------------------------------\x1b[0m');
	console.log('\x1b[33m  Building Tailwind for production!\x1b[0m');
	console.log('\x1b[33m -----------------------------------\n\x1b[0m');

	content = './projects/web/src/**/*.{html,ts}';
} else {
	console.log('\x1b[34m\n ------------------------------------\x1b[0m');
	console.log('\x1b[34m  Building Tailwind for development!\x1b[0m');
	console.log('\x1b[34m ------------------------------------\n\x1b[0m');
}

module.exports = {
	content: [content],
	theme: {
		extend: {},
	},
	plugins: [],
};
