const fs = require('fs');
const inquirer = require('inquirer');
const { exec } = require('child_process');

// Define a list of options for the user to choose from
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
const basePath = './projects/softside-ui';
const COMPONENT_TEMPLATE_PATH = `${basePath}/.templates/template.component.txt`;
const NG_PACKAGE_TEMPLATE_PATH = `${basePath}/.templates/ng-package.json`;
const componentsPath = `${basePath}/lib/components/`;

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

		exec(`code -g ${componentFullPath}/${componentName}.component.ts`, (err, stdout, stderr) => {
			if (err) {
				console.log("node couldn't execute the command");
				return;
			}
		});
	})
	.catch((error) => {
		console.error('Error:', error);
	});
