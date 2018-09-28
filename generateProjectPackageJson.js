
const crossEnvDev = 'cross-env NODE_ENV=development'
const crossEnvProd = 'cross-env NODE_ENV=production'

const genarateScripts = (node, nodeandweb, compiler) => {
  if(nodeandweb){
    return {
      'watch:server': `${ crossEnvDev } ${compiler} --config ${compiler}.config.server.js -w`,
      'watch:web': `${ crossEnvDev } ${compiler} --config ${compiler}.config.web.js -w`,
      'build:dev': `${ crossEnvDev } ${compiler} --config ${compiler}.config.server.js && ${ crossEnvDev } ${compiler} --config ${compiler}.config.web.js`,
      'build:prod': `${ crossEnvProd } ${compiler} --config ${compiler}.config.server.js && ${ crossEnvProd } ${compiler} --config ${compiler}.config.web.js`,
      'bs': ``,//TODO
      'start': ''//TODO - this will need to be npm-run-all and run both watchs and then start browsersync
    }
  }
  const target = node ? 'server' : 'web'
  return {
    'watch': `${ crossEnvDev } ${compiler} --config ${compiler}.config.${target}.js -w`,
    'build:dev': `${ crossEnvDev } ${compiler} --config ${compiler}.config.${target}.js`,
    'build:prod': `${ crossEnvProd } ${compiler} --config ${compiler}.config.${target}.js`,
    ...!node ? {'bs': ``} : {},//TODO
    'start': node ? 'node src/index.js' : '',//TODO - this will need to be npm-run-all and run watch and then start browsersync
  }
}

const generateProjectPackageJson = ({node, webpack, nodeandweb}) => {
  const compiler = webpack ? 'webpack' : 'rollup'
  return {
    version: '0.1.0',
    description: "Minimal skeleton for a LightScript app",
    private: true,
    ...node ? {main: "src/index.js"} : {},
    ...nodeandweb ? {main: "src/server/index.js"} : {},
    ...{
      "scripts": {
        ...genarateScripts(node, nodeandweb, compiler),
        "lint": "eslint --ext .js,.lsc src"
      }
    }
  }
}

module.exports = {
  generateProjectPackageJson
}
