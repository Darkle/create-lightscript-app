
const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('./package.json')

let projectName

const programArgs = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name
  })
  .option('--node', 'Create a LightScript skeleton for the server')
  .option('--nodeandweb', 'Create a LightScript skeleton for an app that has both server js and web js')
  .option('--webpack', 'Use Webpack instead of Rollup')
  .parse(process.argv)

if(typeof projectName === 'undefined') {
  console.error('Please specify the project directory:')
  console.log(`  ${chalk.cyan(programArgs.name())} ${chalk.green('<project-directory>')}\n`)
  console.log('For example:')
  console.log(`  ${chalk.cyan(programArgs.name())} ${chalk.green('my-lightscript-app')}`)
  process.exit(1)
}

function getProgramArgs() {
  return [projectName, programArgs]
}

module.exports = {
  getProgramArgs
}
