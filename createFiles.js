const {join: pJoin} = require('path')

const fs = require('fs-extra')

const { generateProjectPackageJson } = require('./generateProjectPackageJson.js')

const templateFolderPath = pJoin(__dirname, 'templates')

function createFiles(cwd, {node, nodeandweb, webpack}, appName) {
  const compiler = webpack ? 'webpack' : 'rollup'
  const webTemplateFolderSrcPath = pJoin(templateFolderPath, 'web')
  const serverTemplateFolderSrcPath = pJoin(templateFolderPath, 'server')
  const serverIndexJsWritePath = pJoin(cwd, 'src', (nodeandweb ? 'server': ''), 'index.lsc')
  const frontendIndexJsWritePath = pJoin(cwd, 'src', (nodeandweb ? 'frontend': ''), 'index.lsc')
  const projectPackageJson = generateProjectPackageJson(node, nodeandweb, webpack)

  fs.writeJSONSync(pJoin(cwd, 'package.json'), {...projectPackageJson, name: appName}, {spaces: 2})
  fs.outputFileSync(pJoin(cwd, '.gitattributes'), '*.lsc linguist-language=javascript')
  fs.outputFileSync(pJoin(cwd, '.gitignore'), '')
  fs.outputFileSync(pJoin(cwd, '.eslintignore'), '')
  fs.copySync(pJoin(templateFolderPath, '.vscode', 'settings.json'), pJoin(cwd, '.vscode', 'settings.json'))
  fs.copySync(pJoin(templateFolderPath, 'eslint-config.js'), pJoin(cwd, '.eslintrc.js'))

  if(node || nodeandweb){
    fs.copySync(pJoin(webTemplateFolderSrcPath, compiler, 'index.lsc'), serverIndexJsWritePath)
    fs.copySync(pJoin(serverTemplateFolderSrcPath, compiler, `${ compiler }.config.server.js`), pJoin(cwd, `${ compiler }.config.server.js`))
    fs.copySync(pJoin(serverTemplateFolderSrcPath, compiler, '.babelrc.server.js'), pJoin(cwd, '.babelrc.server.js'))
  }
  if(!node){  //web or nodeandweb
    fs.copySync(pJoin(webTemplateFolderSrcPath, 'index.html'), pJoin(cwd, 'dist', 'index.html'))
    fs.copySync(pJoin(webTemplateFolderSrcPath, compiler, 'index.lsc'), frontendIndexJsWritePath)
    fs.copySync(pJoin(webTemplateFolderSrcPath, compiler, '.babelrc.web.js'), pJoin(cwd, '.babelrc.web.js'))
    fs.copySync(pJoin(webTemplateFolderSrcPath, compiler, `${ compiler }.config.web.js`), pJoin(cwd, `${ compiler }.config.web.js`))
  }
}

module.exports = {
  createFiles
}
