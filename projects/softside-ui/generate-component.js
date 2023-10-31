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

		console.log('nameArg: ', nameArg);
		if (nameArg == undefined) {
			console.log('You have to supply the component name');
			return;
		}

		const lastOccurrenceIndex = nameArg.lastIndexOf('/');

		path = nameArg;

		if (lastOccurrenceIndex === -1) {
			fileName = nameArg;
		} else {
			fileName = nameArg.slice(lastOccurrenceIndex + 1);
		}

		const componentName = `${fileName[0].toUpperCase()}${fileName.slice(1)}`.replace(/-./g, (match) => match[1].toUpperCase());
		console.log('fileName: ', fileName);
		console.log('componentName: ', componentName);
		console.log('path: ', path);

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
	}
})();
