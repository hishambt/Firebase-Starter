/** @type {import('tailwindcss').Config} */

var content = './src/**/*.{html,ts}';

if (process.env.NODE_ENV && process.env.NODE_ENV.includes('build')) {
	console.log('\x1b[33m\n -----------------------------------\x1b[0m');
	console.log('\x1b[33m  Building Tailwind for production!\x1b[0m');
	console.log('\x1b[33m -----------------------------------\n\x1b[0m');

	content = './projects/core-ui/src/**/*.{html,ts}';
} else {
	console.log('\x1b[33m\n ------------------------------------\x1b[0m');
	console.log('\x1b[33m  Building Tailwind for development!\x1b[0m');
	console.log('\x1b[33m ------------------------------------\n\x1b[0m');
}

module.exports = {
	content: [content],
	theme: {
		extend: {},
	},
	plugins: [],
};
