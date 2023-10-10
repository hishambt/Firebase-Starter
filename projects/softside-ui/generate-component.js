const fs = require('fs');

generateComponent();

function generateComponent() {
	const nameArg = process.argv[2];

	let path;

	if (nameArg == undefined) {
		console.log('You have to supply the component name');
		return;
	}

	const lastOccurrenceIndex = nameArg.lastIndexOf('/');

	if (lastOccurrenceIndex === -1) {
		path = '.';
		fileName = nameArg;
	} else {
		path = nameArg;
		fileName = nameArg.slice(lastOccurrenceIndex + 1);
	}

	const componentName = `${fileName[0].toUpperCase()}${fileName.slice(1)}`;

	// Create folder
	if (!fs.existsSync('src/lib/' + path)) {
		fs.mkdirSync('src/lib/' + path, { recursive: true }, (err) => {
			if (err) {
				console.error(`Error creating folder: ${err}`);
				return;
			}
		});
	}

	// Read the file and save the contents in a variable
	fs.promises.readFile('./template.component.txt', 'utf8').then((fileContent) => {
		let newFileContent = fileContent.replaceAll('%%NAME%%', fileName);

		newFileContent = newFileContent.replaceAll('%%C_NAME%%', componentName);

		fs.promises.writeFile(`src/lib/${path}/${fileName}.component.ts`, newFileContent, 'utf8');
	});
}
