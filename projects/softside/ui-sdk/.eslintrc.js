module.exports = {
	extends: '../../../.eslintrc.js',
	ignorePatterns: ['!**/*'],
	overrides: [
		{
			files: ['*.ts'],
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
