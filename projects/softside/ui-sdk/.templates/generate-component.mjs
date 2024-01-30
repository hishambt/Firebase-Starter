import fs from 'fs';
import { createPromptModule } from 'inquirer';
import { execSync } from 'child_process';

const prompt = createPromptModule();
const componentType = [
	'breadcrumbs',
	'buttons',
	'cards',
	'chips',
	'composed',
	'dates',
	'dropdowns',
	'entities',
	'hyperlinks',
	'icons',
	'imgs',
	'inputs',
	'labels',
	'loader',
	'menu-items',
	'panels',
	'segments',
	'sliders',
	'textareas',
	'toggles',
];
const basePath = './projects/softside/ui-sdk';
const COMPONENT_TEMPLATE_PATH = `${basePath}/.templates/template.component.txt`;
const NG_PACKAGE_TEMPLATE_PATH = `${basePath}/.templates/ng-package.json`;
const INDEX_TS_TEMPLATE_PATH = `${basePath}/.templates/index.txt`;
const componentsPath = `${basePath}/lib/components/`;

prompt([
	{
		type: 'list',
		name: 'componentType',
		message: 'Select a component type to generate:',
		choices: componentType,
	},
	{
		type: 'input',
		name: 'componentName',
		message: 'Enter the component name:',
		validate: (input) => {
			if (!!input) {
				return true;
			} else {
				return 'Please enter a component name';
			}
		},
	},
])
	.then((answers) => {
		// Create the library folder
		const componentName = answers.componentName;
		const componentFullPath = `${componentsPath}${answers.componentType}/${componentName}`;

		if (fs.existsSync(componentFullPath)) {
			console.error(`"${componentName}"`, 'component already exists');
			return;
		}

		// ng-package
		fs.mkdirSync(componentFullPath, { recursive: true });
		fs.copyFileSync(
			NG_PACKAGE_TEMPLATE_PATH,
			`${componentFullPath}/ng-package.json`,
		);

		// public-api
		const publicAPI = `export * from './${componentName}.component';`;
		fs.writeFileSync(`${componentFullPath}/public-api.ts`, publicAPI);

		// index.ts
		fs.copyFileSync(
			INDEX_TS_TEMPLATE_PATH,
			`${componentFullPath}/index.ts`,
		);

		// component.ts
		const classSuffix = answers.componentType.replace(/s$/, '');

		let template = fs.readFileSync(COMPONENT_TEMPLATE_PATH, 'utf-8');
		template = template.replace(/{{classSuffix}}/g, classSuffix);
		template = template.replace(/{{name}}/g, componentName);
		template = template.replace(
			/{{cName}}/g,
			`${componentName[0].toUpperCase()}${componentName.slice(1)}`.replace(
				/-./g,
				(match) => match[1].toUpperCase(),
			),
		);
		template = template.replace(
			/{{cClassSuffix}}/g,
			`${classSuffix[0].toUpperCase()}${classSuffix.slice(1)}`,
		);

		fs.writeFileSync(
			`${componentFullPath}/${componentName}.component.ts`,
			template,
		);

		execSync(`code -g ${componentFullPath}/${componentName}.component.ts`, {
			stdio: 'inherit',
		});
	})
	.catch((error) => {
		console.error('Error:', error);
	});
