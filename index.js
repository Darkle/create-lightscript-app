#!/usr/bin/env node
const path = require('path')
const os = require('os')
const { spawn } = require('child_process')

const fs = require('fs-extra')
const chalk = require('chalk')

const { checkAppNameCanBeUsed } = require('./utils.js')
const { createConfigAndJSFiles } = require('./createConfigAndJSFiles.js')
const { generatePackagesListToInstall } = require('./generatePackagesListToInstall.js')
const { generateProjectPackageJson } = require('./generateProjectPackageJson.js')
const { getProgramArgs } = require('./argsParser.js')

const templateFolderPath = path.join(__dirname, 'templates')

const [projectName, programArgs] = getProgramArgs()
createApp(projectName, programArgs)

function createApp(name, programArgs) {
  const projectRoot = path.resolve(name)
  const appName = path.basename(projectRoot)
  const packagesToInstall = generatePackagesListToInstall(programArgs)
  const projectPackageJson = generateProjectPackageJson(programArgs)

  checkAppNameCanBeUsed(appName)
  fs.ensureDirSync(projectRoot)

  console.log(`Creating a new LightScript app in ${chalk.green(projectRoot)}.\n`)

  process.chdir(projectRoot)

  writeProjectPackageJson(projectRoot, projectPackageJson, appName)

  console.log('Installing packages.\n')
  installNpmPackages(packagesToInstall)

  createConfigAndJSFiles(process.cwd(), templateFolderPath, programArgs)
}

function writeProjectPackageJson(projectRoot, projectPackageJson, appName){
  fs.writeFileSync(
    path.join(projectRoot, 'package.json'),
    JSON.stringify({...projectPackageJson, name: appName}, null, 2) + os.EOL
  )
}

function installNpmPackages(packagesToInstall){
  const child = spawn('npm', ['install', ...packagesToInstall ,'-D'], { stdio: 'inherit' });
  child.on('close', code => {
    if(code !== 0) {
      console.error('There was an error installing the packages.')
    }
  })
}
