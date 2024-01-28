import { createPromptModule } from 'inquirer';
import { execSync } from 'child_process';

const scopes = [
	'feat',
	'fix',
	'docs',
	'style',
	'refactor',
	'perf',
	'test',
	'build',
	'ci',
	'bug',
	'chore',
	'revert',
];

const prompt = createPromptModule();
prompt([
	{
		type: 'input',
		name: 'message',
		message: 'Commit message:',
	},
	{
		type: 'list',
		name: 'scope',
		message: 'Scope of changes:',
		choices: scopes,
	},
	{
		type: 'confirm',
		name: 'breakingChange',
		default: false,
		message: 'Is it a breaking change?',
	},
	{
		type: 'input',
		name: 'description',
		message: 'Detailed description:',
	},
	{
		type: 'input',
		name: 'jiraNumber',
		message: 'JIRA Ticket Number: (FS-{number})',
	},
	{
		type: 'confirm',
		name: 'addFiles',
		message: 'Add all files automatically?',
		default: 'yes',
	},
]).then((answers) => {
	if (answers.breakingChange) {
		console.log('Breaking Change');
		console.log('Not Implemented');
	}

	const commitCommand = `git commit -m "FS-${answers.jiraNumber}: (${answers.scope}) - ${answers.message}" -m "${answers.description}"`;

	if (answers.addFiles) {
		execSync('git add .', { stdio: 'inherit' });
	}

	execSync(commitCommand, { stdio: 'inherit' });
});
