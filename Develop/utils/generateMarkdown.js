// function to generate markdown for README

const installInfo = readmeData => {
  console.log(readmeData)
  return `
    ${readmeData.installation
      .map(({ install }) => {
        return `
          ${install}
          `;
    })
  .join(' ')}
  `;
};

const creditsInfo = readmeData => {
  return `
    ${readmeData.credits
    .map(({ contributor, contGitHub }) => {
      return `
        Contributor: ${contributor}
        GitHub: https://github.com/${contGitHub}
      `;
    })
  .join(' ')}
  `;
};

const featuresInfo = readmeData => {
  return `
    ${readmeData.features
    .map(({ feature }) => {
      return `
        ${feature}
      `;
    })
  .join(' ')}
  `;
};

const contributingInfo = readmeData => {
  if(readmeData.contConfirm) {
    return `
      Please follow the standard Contributor Covenant when looking to make any additions to this project. The Standard Contributor Covenant can be found at [https://www.contributor-covenant.org/](https://www.contributor-covenant.org/)
    `;
  } else {
    return `
    ${readmeData.selfCont}
    `
  }
};

const licenseLink = readmeData => {
  if(readmeData.license === 'Apache') {
    return `[See Apache License](https://choosealicense.com/licenses/apache-2.0)`
  } else if(readmeData.license === 'MIT') {
    return `[See MIT License](https://choosealicense.com/licenses/mit)`
  } else if(readmeData.license === 'GNU GPLv2') {
    return `[See GNU GPLv2 License](https://choosealicense.com/licenses/gpl-2.0)`
  } else if(readmeData.license === 'GNU GPLv3') {
    return `[See GNU GPLv3 License](https://choosealicense.com/licenses/gpl-3.0)`
  } else {
    `[See ISC License](https://choosealicense.com/licenses/isc)`
  }
};

const badgesDisp = data => {
  if(data.badges === 'JavaScript') {
    return `![badge](https://img.shields.io/badge/JavaScript-100%25-blue)`
  } else if(data.badges === 'Node') {
    return `![badge](https://img.shields.io/badge/Node.js-Required-brightgreen)`
  } else if(data.badges === 'MIT') {
    return `![badge](https://img.shields.io/badge/license-MIT-brightgreen)`
  } else {
    `![badge](https://img.shields.io/badge/license-Apache-blue)`
  }
}

module.exports = readmeData => {

return `
  # ${readmeData.title}

  ${badgesDisp(readmeData)}

  ## Description
  ${readmeData.description}

  ## Table of Contents
    * [Installation](#installation)
    * [Usage](#usage)
    * [Credits](#credits)
    * [License](#license)
    * [Contribution](#contributing)

  ## Installation
  ${installInfo(readmeData)}

  ## Usage
  ${readmeData.usage}

  ## Credits
  ${creditsInfo(readmeData)}

  ## License
  ${readmeData.license}
  ${licenseLink(readmeData)}

  ## Features
  ${featuresInfo(readmeData)}

  ## Contributing
  ${contributingInfo(readmeData)}
  `;
};