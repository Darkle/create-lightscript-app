#!/usr/bin/env node
const path = require('path')
const { spawn } = require('child_process')
const os = require('os')

const fs = require('fs-extra')
const chalk = require('chalk')

const { getProgramArgs } = require('./argsParser.js')
const { checkAppNameCanBeUsed } = require('./utils.js')
const { createFiles } = require('./createFiles.js')
const { generatePackagesListToInstall } = require('./generatePackagesListToInstall.js')

const isWindows = os.platform() === 'win32'

createApp(...getProgramArgs())

function createApp(projectName, programArgs) {
  const projectRoot = path.resolve(projectName)
  const appName = path.basename(projectRoot)
  const packagesToInstall = generatePackagesListToInstall(programArgs)

  checkAppNameCanBeUsed(appName)

  console.log(`Creating a new LightScript app in ${chalk.green(projectRoot)}.\n`)

  fs.ensureDirSync(projectRoot)
  process.chdir(projectRoot)
  createFiles(process.cwd(), programArgs, appName)
  installNpmPackages(packagesToInstall)
}

function installNpmPackages(packagesToInstall){
  console.log('Installing packages.\n')
  const child = spawn(
    'npm',
    [
      'install',
      ...packagesToInstall ,
      '-D'
    ],
    {
      stdio: 'inherit',
      // had some issues on windows, 'shell:true' seems to fix it
      shell: isWindows ? true : false
    }
  )
  child.on('close', code => {
    if(code !== 0) {
      console.error('There was an error installing the packages.')
    }
  })
}
