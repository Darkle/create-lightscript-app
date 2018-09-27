#!/usr/bin/env node
/*****
* Based on https://github.com/facebook/create-react-app/blob/master/packages/create-react-app/createReactApp.js
*/
const path = require('path')
const os = require('os')
const { spawn } = require('child_process')

const fs = require('fs-extra')
const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('./package.json')
const { checkAppName } = require('./utils.js')
const { createConfigAndJSFiles } = require('./createConfigAndJSFiles.js')

let projectName
const packagesToInstall = [
  '@lightscript/babel-preset',
  '@lightscript/eslint-plugin',
  '@babel/plugin-transform-runtime',
  '@babel/runtime',
  '@babel/preset-env',
  '@babel/cli',
  '@babel/core',
  'cross-env',
  'eslint',
  'rollup',
  'rollup-plugin-babel',
  'rollup-plugin-node-resolve',
  'rollup-plugin-commonjs'
]
const templateFolderPath = path.join(__dirname, 'templates')
const projectPackageJson = {
  version: '0.1.0',
  description: "Minimal skeleton for a LightScript app",
  main: "src/server/index.js",TODO:maybe only specify this when theres server code
  private: true,
  "scripts": {
    "rollup:watch:server": "cross-env NODE_ENV=development rollup -c rollup.config.server.js -w",
    "rollup:watch:web": "cross-env NODE_ENV=development rollup -c rollup.config.web.js -w",
    "build:dev": "cross-env NODE_ENV=development rollup -c rollup.config.server.js && cross-env NODE_ENV=development rollup -c rollup.config.web.js",
    "build:prod": "cross-env NODE_ENV=production rollup -c rollup.config.server.js && cross-env NODE_ENV=production rollup -c rollup.config.web.js",
    "lint": "eslint --ext .js,.lsc src",
    "start": "node src/server/index.js"
  }
}

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name
  })
  .parse(process.argv)

if(typeof projectName === 'undefined') {
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  )
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-lightscript-app')}`)
  process.exit(1)
}

createApp(projectName)

function createApp(name) {
  const root = path.resolve(name)
  const appName = path.basename(root)

  checkAppName(appName)
  fs.ensureDirSync(name)

  console.log(`Creating a new LightScript app in ${chalk.green(root)}.`)
  console.log()

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(
      {
        ...projectPackageJson,
        name: appName,
      },
      null,
      2
    )
    + os.EOL
  )

  process.chdir(root)

  console.log('Installing packages. This might take a couple of minutes.')
  console.log()
  console.log(`Installing: ${ packagesToInstall.join('\n') }..`)
  console.log()

  const child = spawn('npm', ['install', ...packagesToInstall ,'-D'], { stdio: 'inherit' });
  child.on('close', code => {
    if(code !== 0) {
      console.error('There was an error installing the packages.')
    }
  })

  createConfigAndJSFiles(process.cwd(), templateFolderPath)
}
