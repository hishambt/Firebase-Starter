const fs = require('fs');
const inquirer = require('inquirer');

// Define a list of options for the user to choose from
const libraryOptions = ['element', 'component'];
const templatesPath = './.templates';

// Create a prompt using inquirer
inquirer
	.prompt([
		{
			type: 'list',
			name: 'libraryType',
			message: 'Select a library element to generate:',
			choices: libraryOptions,
		},
		{
			type: 'input',
			name: 'libraryName',
			message: 'Enter the library name:',
		},
		{
			type: 'input',
			name: 'elementName',
			message: 'Enter the element name:',
			when: (answers) => answers.libraryType === 'Element',
		},
		{
			type: 'input',
			name: 'componentName',
			message: 'Enter the component name:',
			when: (answers) => answers.libraryType === 'Component',
		},
	])
	.then((answers) => {
		// Create the library folder
		const libraryDir = `./${answers.libraryName}`;
		fs.mkdirSync(libraryDir);

		// Generate the public API entry point (public-api.ts)
		const publicAPI = `
export * from './${answers.libraryType}s/${answers.libraryType.toLowerCase()}-library';
`;
		fs.writeFileSync(`${libraryDir}/public-api.ts`, publicAPI);

		// Create the library element or component
		const templateFileName = answers.libraryType === 'Element' ? 'element-template.txt' : 'component-template.txt';
		const template = fs.readFileSync(`${templatesPath}/${templateFileName}`, 'utf-8');
		const content = template.replace(/{{name}}/g, answers.libraryType === 'Element' ? answers.elementName : answers.componentName);
		const elementTypeDir = `${libraryDir}/${answers.libraryType.toLowerCase()}s`;
		//check if exist
		fs.mkdirSync(elementTypeDir);
		fs.writeFileSync(`${elementTypeDir}/${answers.libraryType.toLowerCase()}-library.ts`, content);

		console.log(`${answers.libraryType} "${answers.elementName || answers.componentName}" created in "${libraryDir}"`);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
