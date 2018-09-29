const path = require('path')

const crossEnvDev = 'cross-env NODE_ENV=development'
const crossEnvProd = 'cross-env NODE_ENV=production'

function generateProjectPackageJson(node, nodeandweb, webpack, name){
  return {
    name,
    version: '0.1.0',
    description: "Minimal skeleton for a LightScript app",
    private: true,
    scripts: {
      ...genarateScripts(node, nodeandweb, webpack),
      lint: 'eslint --ext .js,.lsc src'
    }
  }
}

function genarateScripts(node, nodeandweb, webpack) {
  const compiler = webpack ? 'webpack' : 'rollup'
  const serverBuildScript = `--config ${compiler}.config.server.js`
  const webBuildScript = `--config ${compiler}.config.web.js`
  const nodeOrWebBuildScript = node ? serverBuildScript : webBuildScript
  const serverIndexJsPath = path.join('src', (nodeandweb ? 'server': ''), 'index.js')

  if(nodeandweb){
    return {
      'watch:server': `${crossEnvDev} ${compiler} ${serverBuildScript} -w`,
      'watch:web': `${crossEnvDev} ${compiler} ${webBuildScript} -w`,
      'build:dev': `${crossEnvDev} ${compiler} ${serverBuildScript} && ${crossEnvDev} ${compiler} ${webBuildScript}`,
      'build:prod': `${crossEnvProd} ${compiler} ${serverBuildScript} && ${crossEnvProd} ${compiler} ${webBuildScript}`,
      'nodemon': `nodemon ${serverIndexJsPath}`,
      'bs': `browser-sync start --server 'dist' --files 'dist'`,
      'start': 'npm-run-all build:dev --parallel --continue-on-error watch:* nodemon bs'
    }
  }
  //node or web
  return {
    'watch': `${crossEnvDev} ${compiler} ${nodeOrWebBuildScript} -w`,
    'build:dev': `${crossEnvDev} ${compiler} ${nodeOrWebBuildScript}`,
    'build:prod': `${crossEnvProd} ${compiler} ${nodeOrWebBuildScript}`,
    ...node ?
      { "nodemon": `nodemon ${serverIndexJsPath}` } :
      {'bs': `browser-sync start --server 'dist' --files 'dist'`}
    ,
    'start': `npm-run-all build:dev --parallel --continue-on-error watch ${node ? 'nodemon' : 'bs'}`
  }
}


module.exports = {
  generateProjectPackageJson
}
