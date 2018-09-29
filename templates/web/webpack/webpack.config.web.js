const path = require('path')

const projectDir = path.resolve(__dirname)
const srcDir = path.join(projectDir, 'src')
const distDir = path.join(projectDir, 'dist')
const mainAppEntryPoint = path.join(srcDir, 'index.lsc')
const ISDEV = process.env.NODE_ENV !== 'production'

const webpackOptions = {
  entry: mainAppEntryPoint,
  output: {
    filename: 'index.js',
    path: distDir
  },
  mode: process.env.NODE_ENV,
  target: 'web',
  devtool: ISDEV ? 'source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /.lsc$/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader',
        options: {
          sourceMap: ISDEV
        }
      },
      {
        test: [/\.css$/, /\.scss$/, /\.sass$/, /\.styl$/, /\.less$/],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.lsc', '.js']
  },
  optimization: {
    minimize: !ISDEV
  }
}

module.exports = webpackOptions
