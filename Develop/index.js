const inquirer = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown.js')
const fs = require('fs');

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
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please provide instructions or examples for use!');
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
        {
            type: 'confirm',
            name: 'contConfirm',
            message: 'Would you like to use the standard Contributor Covenant?',
            default: true
        },
        {
            type: 'input',
            name: 'selfCont',
            message: 'Please write your own Contribution guidelines.',
            when: ({contConfirm}) => {
                if(contConfirm) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'badges',
            message: 'Please choose any badges to add to your project.',
            choices: ['JavaScript', 'Node', 'Boys', 'Fun Times']
        }
    ])
};

const installPrompt = readmeData => {
    if(!readmeData.installation) {
        readmeData.installation = []
    }
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'install',
            message: 'List any installation steps. (Room provided if more needed)',
            validate: installInput => {
                if (installInput) {
                    return true;
                } else {
                    console.log("Please add the installation steps!");
                    return false;
                } 
            }
        },
        {
            type: 'confirm',
            name: 'installConfirm',
            message: 'Do you need to add an additional installation step?',
            default: true
        }
    ])
        .then(installData => {
            readmeData.installation.push(installData);
            if (installData.installConfirm) {
                return installPrompt(readmeData);
            } else {
                return readmeData;
            }
        })
};

const creditsPrompt = readmeData => {
    if(!readmeData.credits) {
        readmeData.credits = []
    }
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'contributor',
            message: 'List the name of a contributor.',
            validate: contributorInput => {
                if (contributorInput) {
                    return true;
                } else {
                    console.log("Please add the name of any contributors!");
                    return false;
                } 
            }
        },
        {
            type: 'input',
            name: 'contGitHub',
            message: 'What is the contributors GitHub name?',
            validate: contGitHubInput => {
                if (contGitHubInput) {
                    return true;
                } else {
                    console.log("Please add the GitHub name of the contributor!");
                    return false;
                } 
            }
        },
        {
            type: 'confirm',
            name: 'contConfirm',
            message: 'Are there any other contributors?',
            default: true
        }
    ])
    .then(creditsData => {
        readmeData.credits.push(creditsData);
        if (creditsData.contConfirm) {
            return creditsPrompt(readmeData);
        } else {
            return readmeData;
        }
    })
};

const featuresPrompt = readmeData => {
    if(!readmeData.features) {
        readmeData.features = []
    }
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'feature',
            message: 'List any features of your application.',
            validate: features => {
                if (features) {
                    return true;
                } else {
                    console.log("Please add a feature!");
                    return false;
                } 
            }
        },
        {
            type: 'confirm',
            name: 'featureConfirm',
            message: 'Do you want to add any more features?',
            default: true
        }
    ])
    .then(featuresData => {
        readmeData.features.push(featuresData);
        if (featuresData.featureConfirm) {
            return featuresPrompt(readmeData);
        } else {
            return readmeData;
        }
    })
};

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./test.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

// function call to initialize program
readmeQuest()
    .then(installPrompt)
    .then(creditsPrompt)
    .then(featuresPrompt)
    .then(readmeData => {
        return generateMarkdown(readmeData);
    })
    .then(readmeMD => {
      return  writeFile(readmeMD)
    })
