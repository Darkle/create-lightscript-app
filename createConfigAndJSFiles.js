const path = require('path')

const fs = require('fs-extra')

function createConfigAndJSFiles(cwd, templateFolderPath, {webpack, node, nodeandweb}) {
  const compiler = webpack ? 'webpack' : 'rollup'
  const webTemplateFolderSrcPath = path.join(templateFolderPath, 'web')
  const serverTemplateFolderSrcPath = path.join(templateFolderPath, 'server')
  const serverIndexJsWritePath = path.join(cwd, 'src', (nodeandweb ? 'server': ''), 'index.lsc')
  const frontendIndexJsWritePath = path.join(cwd, 'src', (nodeandweb ? 'frontend': ''), 'index.lsc')

  fs.outputFileSync(path.join(cwd, '.gitattributes'), '*.lsc linguist-language=javascript')
  fs.outputFileSync(path.join(cwd, '.gitignore'), '')
  fs.outputFileSync(path.join(cwd, '.eslintignore'), '')
  fs.copySync(path.join(templateFolderPath, '.vscode', 'settings.json'), path.join(cwd, '.vscode', 'settings.json'))
  fs.copySync(path.join(templateFolderPath, 'eslint-config.js'), path.join(cwd, '.eslintrc.js'))

  if(node || nodeandweb){
    fs.copySync(path.join(webTemplateFolderSrcPath, compiler, 'index.lsc'), serverIndexJsWritePath)
    fs.copySync(path.join(serverTemplateFolderSrcPath, compiler, `${ compiler }.config.server.js`), path.join(cwd, `${ compiler }.config.server.js`))
    fs.copySync(path.join(serverTemplateFolderSrcPath, compiler, '.babelrc.server.js'), path.join(cwd, '.babelrc.server.js'))
  }
  if(!node){  //web or nodeandweb
    fs.copySync(path.join(webTemplateFolderSrcPath, 'index.html'), path.join(cwd, 'dist', 'index.html'))
    fs.copySync(path.join(webTemplateFolderSrcPath, compiler, 'index.lsc'), frontendIndexJsWritePath)
    fs.copySync(path.join(webTemplateFolderSrcPath, compiler, '.babelrc.web.js'), path.join(cwd, '.babelrc.web.js'))
    fs.copySync(path.join(webTemplateFolderSrcPath, compiler, `${ compiler }.config.web.js`), path.join(cwd, `${ compiler }.config.web.js`))
  }
}

module.exports = {
  createConfigAndJSFiles
}
