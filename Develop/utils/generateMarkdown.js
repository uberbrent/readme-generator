// function to generate markdown for README
function generateMarkdown(data) {
  return `
    # ${data.title}

    ## Description
    ${data.description}

    ## Table of Contents

    ## Installation
    ${data.installation}

    ## Usage
    ${data.usage}

    ## Credits
    ${data.credits}

    ## License
    ${data.license}

    ## Features
    ${data.features}

    ## Contributing
    ${data.contributing}


`;
}

module.exports = generateMarkdown;
