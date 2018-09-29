
const basePackagesToInstall = [
  '@lightscript/babel-preset',
  '@lightscript/eslint-plugin',
  '@babel/preset-env',
  '@babel/cli',
  '@babel/core',
  'cross-env',
  'eslint',
  'npm-run-all',
]

const baseFrontendPackages = [
  '@babel/plugin-transform-runtime',
  '@babel/runtime',
  'browser-sync',
  'node-sass',
  'stylus',
  'less',
]

const baseBackendPackages = [
  'nodemon'
]

const baseRollupPackages = [
  'rollup',
  'rollup-plugin-babel',
  'rollup-plugin-node-resolve',
  'rollup-plugin-commonjs',
]

const rollupFrontendPackages = [
  'rollup-plugin-postcss',
]

const baseWebpackPackages = [
  'babel-loader',
  'webpack',
  'webpack-cli',
]

const webpackBackendPackages = [
  'webpack-node-externals'
]

const webpackFrontendPackages = [
  'postcss-loader',
  'style-loader',
  'css-loader',
  'precss',
  'autoprefixer',
]

function generatePackagesListToInstall({node, webpack, nodeandweb}){
  let packagesToInstall = basePackagesToInstall
  if (webpack){
    packagesToInstall = packagesToInstall.concat(baseWebpackPackages)
  }
  else{
    packagesToInstall = packagesToInstall.concat(baseRollupPackages)
  }
  if(node || nodeandweb){
    packagesToInstall = packagesToInstall.concat(baseBackendPackages)
    if(webpack){
      packagesToInstall = packagesToInstall.concat(webpackBackendPackages)
    }
  }
  if(!node){
    packagesToInstall = packagesToInstall.concat(baseFrontendPackages)
    if(webpack){
      packagesToInstall = packagesToInstall.concat(webpackFrontendPackages)
    }
    else{
      packagesToInstall = packagesToInstall.concat(rollupFrontendPackages)
    }
  }

  return packagesToInstall
}

module.exports = {
  generatePackagesListToInstall
}
