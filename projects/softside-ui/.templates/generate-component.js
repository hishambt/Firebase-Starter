const fs = require('fs');
const inquirer = require('inquirer');

// Define a list of options for the user to choose from
const componentType = [
	'breadcrumb',
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
const COMPONENT_TEMPLATE_PATH = './templates/template.component.txt';
const NG_PACKAGE_TEMPLATE_PATH = './templates/ng-package.json';
const componentsPath = './lib/components/'; // relative to package.json location

// Create a prompt using inquirer
inquirer
	.prompt([
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
		fs.copyFileSync(NG_PACKAGE_TEMPLATE_PATH, `${componentFullPath}/ng-package.json`);

		// public-api
		const publicAPI = `export * from './${componentName}.component';`;
		fs.writeFileSync(`${componentFullPath}/public-api.ts`, publicAPI);

		// component.ts
		let template = fs.readFileSync(COMPONENT_TEMPLATE_PATH, 'utf-8');
		template = template.replace(/{{name}}/g, componentName);
		template = template.replace(
			/{{cName}}/g,
			`${componentName[0].toUpperCase()}${componentName.slice(1)}`.replace(/-./g, (match) => match[1].toUpperCase()),
		);
		fs.writeFileSync(`${componentFullPath}/${componentName}.component.ts`, template);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
