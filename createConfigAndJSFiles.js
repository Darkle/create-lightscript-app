const path = require('path')

const fs = require('fs-extra')

function createConfigAndJSFiles(cwd, templateFolderPath) {
  fs.outputFileSync(path.join(cwd, '.gitattributes'), '*.lsc linguist-language=javascript')
  fs.outputFileSync(path.join(cwd, '.gitignore'), '')
  fs.outputFileSync(path.join(cwd, '.eslintignore'), '')
  fs.outputFileSync(path.join(cwd, 'src', 'server', 'index.lsc'), 'console.log("Hello from index.lsc on the Server!")')
  fs.outputFileSync(path.join(cwd, 'src', 'frontend', 'index.lsc'), 'console.log("Hello from index.lsc in the Browser!")')
  fs.copySync(path.join(templateFolderPath, 'eslint-config.js'), path.join(cwd, '.eslintrc.js'))
  fs.copySync(path.join(templateFolderPath, '.babelrc.server.js'), path.join(cwd, '.babelrc.server.js'))
  fs.copySync(path.join(templateFolderPath, '.babelrc.web.js'), path.join(cwd, '.babelrc.web.js'))
  fs.copySync(path.join(templateFolderPath, 'rollup.config.server.js'), path.join(cwd, 'rollup.config.server.js'))
  fs.copySync(path.join(templateFolderPath, 'rollup.config.web.js'), path.join(cwd, 'rollup.config.web.js'))
  fs.copySync(path.join(templateFolderPath, '.vscode', 'launch.json'), path.join(cwd, '.vscode', 'launch.json'))
  fs.copySync(path.join(templateFolderPath, '.vscode', 'settings.json'), path.join(cwd, '.vscode', 'settings.json'))
}

module.exports = {
  createConfigAndJSFiles
}
