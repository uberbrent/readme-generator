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
}

module.exports = readmeData => {

return `
  # ${readmeData.title}

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

  ## Features
  ${featuresInfo(readmeData)}

  ## Contributing
  ${contributingInfo(readmeData)}
  `;
};