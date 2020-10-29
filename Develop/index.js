const inquirer = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown')

// array of questions for user
const readmeQuest = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project.',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please describe your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide any instructions or examples for usage.',
            validate: Input => {
                if (installInput) {
                    return true;
                } else {
                    console.log('Please list installation steps!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license that applies to your project.',
            choices: ['Apache', 'MIT', 'GNU GPLv2', 'GNU GPLv3', 'ISC']
        },
    ])
}; 


// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
