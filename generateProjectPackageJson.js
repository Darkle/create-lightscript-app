const crossEnvDev = 'cross-env NODE_ENV=development'
const crossEnvProd = 'cross-env NODE_ENV=production'

const genarateScripts = (node, nodeandweb, webpack, serverIndexJsPath) => {
  const compiler = webpack ? 'webpack' : 'rollup'
  const serverBuildScript = `--config ${compiler}.config.server.js`
  const webBuildScript = `--config ${compiler}.config.web.js`
  const nodeOrWebBuildScript = node ? serverBuildScript : webBuildScript

  if(nodeandweb){
    return {
      'watch:server': `${ crossEnvDev } ${compiler} ${serverBuildScript} -w`,
      'watch:web': `${ crossEnvDev } ${compiler} ${webBuildScript} -w`,
      'build:dev': `${ crossEnvDev } ${compiler} ${serverBuildScript} && ${ crossEnvDev } ${compiler} ${webBuildScript}`,
      'build:prod': `${ crossEnvProd } ${compiler} ${serverBuildScript} && ${ crossEnvProd } ${compiler} ${webBuildScript}`,
      'nodemon': `nodemon ${serverIndexJsPath}`,
      'bs': ``,//TODO
      'start': 'npm-run-all --parallel --continue-on-error watch:* nodemon bs'
    }
  }
  //node or web
  return {
    'watch': `${ crossEnvDev } ${compiler} ${nodeOrWebBuildScript} -w`,
    'build:dev': `${ crossEnvDev } ${compiler} ${nodeOrWebBuildScript}`,
    'build:prod': `${ crossEnvProd } ${compiler} ${nodeOrWebBuildScript}`,
    ...!node ? {'bs': ``} : {}, //TODO
    'start': node ?
      `nodemon ${serverIndexJsPath}` :
      'npm-run-all --parallel --continue-on-error watch bs'
  }
}

const generateProjectPackageJson = (node, nodeandweb, webpack) =>
  ({
    version: '0.1.0',
    description: "Minimal skeleton for a LightScript app",
    private: true,
    ...{
      "scripts": {
        ...genarateScripts(node, nodeandweb, webpack),
        "lint": "eslint --ext .js,.lsc src"
      }
    }
  })


module.exports = {
  generateProjectPackageJson
}
