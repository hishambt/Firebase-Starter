/** @type {import('tailwindcss').Config} */

var content = './src/**/*.{html,ts}';

if (process.env.NODE_ENV && process.env.NODE_ENV.includes('production')) {
	if (process.env.NODE_ENV.includes('web')) {
		content = './projects/web/src/**/*.{html,ts}';
		console.log('\x1b[33m\n ----------------------------------------\x1b[0m');
		console.log('\x1b[33m  Building Tailwind(Web) for production!\x1b[0m');
		console.log('\x1b[33m ----------------------------------------\n\x1b[0m');
	} else if (process.env.NODE_ENV.includes('mobile')) {
		content = './projects/mobile/src/**/*.{html,ts}';
		console.log('\x1b[33m\n -------------------------------------------\x1b[0m');
		console.log('\x1b[33m  Building Tailwind(Mobile) for production!\x1b[0m');
		console.log('\x1b[33m -------------------------------------------\n\x1b[0m');
	}
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
	corePlugins: {
		preflight: false,
	},
};
