const fs = require('fs');

generateComponent();

function generateComponent() {
	// Get the string to replace from the npm argument
	const name = process.argv[2];

	let path;

	if (name == undefined) {
		console.log('You have to supply the component name');
		return;
	}

	const lastOccurrenceIndex = name.lastIndexOf('/');

	if (lastOccurrenceIndex === -1) {
		path = '.';
		fileName = name;
	} else {
		path = name.slice(0, lastOccurrenceIndex);
		fileName = name.slice(lastOccurrenceIndex + 1);
	}

	const componentName = `${fileName[0].toUpperCase()}${fileName.slice(1)}`;

	// Create folder
	fs.mkdirSync('src/lib/' + path, (err) => {
		if (err) {
			console.error(`Error creating folder: ${err}`);
			return;
		}
	});

	// Read the file and save the contents in a variable
	fs.promises
		.readFile('./template.component.txt', 'utf8')
		.then((fileContent) => {
			let newFileContent = fileContent.replaceAll('%%NAME%%', fileName);

			newFileContent = newFileContent.replace(
				'%%C_NAME%%',
				componentName,
			);

			fs.promises.writeFile(
				`src/lib/${path}/${fileName}.component.ts`,
				newFileContent,
				'utf8',
			);
		});
}
