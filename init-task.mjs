import { createPromptModule } from 'inquirer';
import { execSync } from 'child_process';

const prompt = createPromptModule();

prompt([
	{
		type: 'confirm',
		name: 'pull',
		message: 'Do you want to pull?',
	},
	{
		type: 'confirm',
		name: 'startApp',
		message: 'Start the application?',
	},
]).then((answers) => {
	if (answers.pull) {
		execSync('git pull', { stdio: 'inherit' });
	}

	if (!answers.startApp) {
		console.error('Press any key to exit');
		process.exit(1);
	}
});
