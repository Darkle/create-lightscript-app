const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')

function checkAppNameCanBeUsed(appName) {
  const validationResult = validateProjectName(appName);
  if(!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
}
function printValidationResults(results) {
  if(typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

module.exports = {
  checkAppNameCanBeUsed,
  printValidationResults
}
