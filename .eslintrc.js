module.exports = {
	root: true,
	plugins: ['import', 'unused-imports', 'deprecation'],
	ignorePatterns: ['projects/**/*'],
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['./tsconfig.json'],
			},
			parser: '@typescript-eslint/parser',
			extends: [
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@angular-eslint/recommended',
				'plugin:@angular-eslint/template/process-inline-templates',
				'plugin:import/errors',
				'plugin:import/warnings',
			],
			rules: {
				'comma-dangle': ['error', 'always-multiline'],
				curly: ['error'],
				'deprecation/deprecation': 'warn',
				'no-debugger': 'warn',
				'padding-line-between-statements': [
					'error',
					{
						blankLine: 'always',
						prev: '*',
						next: ['for', 'while', 'export', 'if', 'return'],
					},
					{
						blankLine: 'always',
						prev: ['for', 'while', 'export', 'if', 'return'],
						next: '*',
					},
					{
						blankLine: 'always',
						prev: ['const', 'let', 'var'],
						next: ['multiline-expression'],
					},
					{
						blankLine: 'always',
						prev: ['multiline-expression'],
						next: ['*'],
					},
					{
						blankLine: 'always',
						prev: 'export',
						next: '*',
					},
					{
						blankLine: 'never',
						prev: 'export',
						next: 'export',
					},
					{
						blankLine: 'never',
						prev: 'case',
						next: 'case',
					},
					{
						blankLine: 'never',
						prev: 'const',
						next: 'const',
					},
				],
				'max-len': [
					'error',
					{
						code: 170,
						ignoreUrls: true,
						ignorePattern: '^import .*',
						ignoreStrings: true,
						ignoreTemplateLiterals: true,
					},
				],
				'no-empty-function': 'off',
				'no-unused-vars': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'@typescript-eslint/no-empty-function': [
					'error',
					{
						allow: ['arrowFunctions', 'constructors'],
					},
				],
				'@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: false }],
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/explicit-function-return-type': 'error',
				'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', args: 'all' }],
				'@typescript-eslint/no-inferrable-types': [
					'off',
					{
						ignoreParameters: false,
						ignoreProperties: false,
					},
				],
				'@angular-eslint/use-lifecycle-interface': ['off'],
				//TODO(style): Enable member accessor and resolve errors
				'@typescript-eslint/explicit-member-accessibility': [
					'off',
					{
						ignoredMethodNames: [
							'ngOnInit',
							'ngOnChanges',
							'ngAfterViewInit',
							'ngDoCheck',
							'ngAfterContentInit',
							'ngAfterContentChecked',
							'ngAfterViewChecked',
							'ngOnDestroy',
						],
						accessibility: 'explicit',
						overrides: {
							accessors: 'explicit',
							constructors: 'off',
							methods: 'explicit',
							properties: 'explicit',
							parameterProperties: 'explicit',
						},
					},
				],
				'no-multiple-empty-lines': [
					'error',
					{
						max: 1,
					},
				],
				'@typescript-eslint/lines-between-class-members': [
					'error',
					'always',
					{
						exceptAfterOverload: false,
						exceptAfterSingleLine: true,
					},
				],
				'import/order': [
					'error',
					{
						'newlines-between': 'always',
						groups: ['external', 'internal', ['parent', 'sibling', 'index']],
						pathGroups: [],
					},
				],
				'import/first': 'error',
				'import/no-deprecated': 'warn',
				'import/newline-after-import': 'error',
				'import/named': 'error',
				'import/no-unresolved': ['error'],
				'no-restricted-imports': ['error', { paths: ['@example/example-library'] }],
				'unused-imports/no-unused-imports': 'error',
				'no-var': 'error',
				'@angular-eslint/directive-selector': [
					'error',
					{
						type: 'attribute',
						prefix: 'app',
						style: 'camelCase',
					},
				],
				'@angular-eslint/component-selector': [
					'error',
					{
						type: 'element',
						prefix: 'app',
						style: 'kebab-case',
					},
				],
			},
			settings: {
				'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
				'import/resolver': {
					typescript: {
						alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

						// Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

						// // use <root>/path/to/folder/tsconfig.json
						// "project": "path/to/folder",

						// Multiple tsconfigs (Useful for monorepos)

						// use a glob pattern
						project: './tsconfig.json',
					}, // this loads <rootdir>/tsconfig.json to eslint
				},
			},
		},
		{
			files: ['*.module.ts'],
			extends: ['plugin:import/errors', 'plugin:import/warnings'],
			rules: {
				'no-multiple-empty-lines': [
					'error',
					{
						max: 1,
					},
				],
				'import/order': [
					'error',
					{
						'newlines-between': 'always',
						groups: ['external', 'internal', ['parent', 'sibling', 'index']],
						pathGroups: [],
					},
				],
				'import/first': 'error',
				'import/no-deprecated': 'warn',
				'import/newline-after-import': 'error',
				'import/no-unresolved': 'off',
				'import/named': 'error',
				'unused-imports/no-unused-imports': 'error',
				'no-var': 'error',
				'comma-dangle': ['error', 'always-multiline'],
			},
		},
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'max-lines': ['error', 500],
			},
		},
		{
			files: ['*.component.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'max-len': [
					'error',
					{
						code: 170,
						ignoreUrls: true,
						ignorePattern: 'd="([\\s\\S]*?)"',
					},
				],
				'no-multiple-empty-lines': [
					'error',
					{
						max: 1,
					},
				],
			},
		},
	],
};
