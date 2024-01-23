import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
	stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/angular',
		options: {},
	},
	core: {
		disableTelemetry: true,
		enableCrashReports: false,
	},
	docs: {
		autodocs: 'tag',
	},

};

export default config;
