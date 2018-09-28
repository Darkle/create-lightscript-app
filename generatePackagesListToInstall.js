
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

]

const webpackFrontendPackages = [
  'postcss-loader',
]

const generatePackagesListToInstall = ({node, webpack}) =>
  [
    ...basePackagesToInstall,
    ...webpack ? baseWebpackPackages : baseRollupPackages,
    ...node ? [] :
      [
      ...baseFrontendPackages,
      ...webpack ? webpackFrontendPackages : rollupFrontendPackages
      ]
  ]

module.exports = {
  generatePackagesListToInstall
}