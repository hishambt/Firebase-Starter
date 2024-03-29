module.exports = {
	extends: '../../../.eslintrc.js',
	ignorePatterns: ['!**/*'],
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['projects/softside/ui-sdk/tsconfig.*?.json', 'projects/softside/ui-sdk/.storybook/tsconfig.json'],
				createDefaultProgram: true,
			},
			rules: {
				'@angular-eslint/directive-selector': [
					'error',
					{
						type: 'attribute',
						prefix: ['app', 'lib', 'ss'],
						style: 'camelCase',
					},
				],
				'@angular-eslint/component-selector': [
					'error',
					{
						type: 'element',
						prefix: ['app', 'lib', 'ss'],
						style: 'kebab-case',
					},
				],
			},
		},
		{
			files: ['*.html'],
			rules: {},
		},
		{
			files: ['*.js'],
			parserOptions: {
				ecmaVersion: 'latest',
			},
		},
	],
};
