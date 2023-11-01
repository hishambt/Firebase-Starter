const fs = require('fs');

(function () {
	// logic of main
	const nameArg = process.argv[2];
	const filePath = process.argv[3];

	if (nameArg == 'json') {
		if (filePath == undefined) {
			console.log('You have to supply the file path');
			return;
		}

		try {
			const jsonObj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
			generateJsonComponents(jsonObj);
		} catch (error) {
			console.log(error);
		}
	} else {
		generateComponent(nameArg);
	}

	function generateJsonComponents(jsonObj, path = '') {
		Object.entries(jsonObj).forEach(function ([key, value]) {
			if (value instanceof Array) {
				path += key + '/';
				value.forEach(function (fileName) {
					generateComponent(path + fileName);
				});
				path = path.replace(key + '/', '');
			} else if (typeof value === 'object') {
				path += key + '/';
				generateJsonComponents(value, path);
				path = path.replace(key + '/', '');
			} else if (typeof value === 'string') {
				if (key != value) {
					path += key + '/';
				}
				generateComponent(path + value);
				if (key != value) {
					path = path.replace(key + '/', '');
				}
			}
		});
	}
	function generateComponent(nameArg) {
		var path;

		if (nameArg == undefined) {
			console.log('You have to supply the component name');
			return;
		}

		const lastOccurrenceIndex = nameArg.lastIndexOf('/');
		const firstOccurrenceIndex = nameArg.indexOf('/');
		const parentFolder = nameArg.slice(0, firstOccurrenceIndex);

		path = nameArg;

		if (lastOccurrenceIndex === -1) {
			fileName = nameArg;
		} else {
			fileName = nameArg.slice(lastOccurrenceIndex + 1);
		}

		const componentName = `${fileName[0].toUpperCase()}${fileName.slice(1)}`.replace(/-./g, (match) => match[1].toUpperCase());

		// Create folder
		if (!fs.existsSync('lib/ui/' + path)) {
			fs.mkdirSync('lib/ui/' + path, { recursive: true }, (err) => {
				if (err) {
					console.error(`Error creating folder: ${err}`);
					return;
				}
			});
		}

		// Read the file and save the contents in a variable
		const template = fs.readFileSync('./template.component.txt', 'utf8');

		let newFileContent = template.replaceAll('%%NAME%%', fileName);

		newFileContent = newFileContent.replaceAll('%%C_NAME%%', componentName);

		fs.writeFileSync(`lib/ui/${path}/${fileName}.component.ts`, newFileContent, 'utf8');

		console.log('Created: ', path);

		// populatePublicApi(parentFolder, fileName);
	}

	function populatePublicApi(parentFolder, fileName) {
		// Handle public-api file and add the created component to it

		let publicApi;
		const data = `export * from './${fileName}/${fileName}.component';`;

		try {
			publicApi = fs.readFileSync(`lib/ui/${parentFolder}/public-api.ts`, 'utf8');
		} catch (error) {
			fs.writeFileSync(`lib/ui/${parentFolder}/public-api.ts`, '', 'utf8');
			publicApi = fs.readFileSync(`lib/ui/${parentFolder}/public-api.ts`, 'utf8');
		}

		console.log(publicApi);
	}
})();
