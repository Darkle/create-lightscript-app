const path = require('path')

const nodeExternals = require('webpack-node-externals')

const projectDir = path.resolve(__dirname)
const srcDir = path.join(projectDir, 'src')
const mainAppEntryPoint = path.join(srcDir, 'index.lsc')
const ISDEV = process.env.NODE_ENV !== 'production'

/*****
* We dont want webpack to include polyfills or mocks for various node stuff, which we set with
* the 'node' key https://webpack.js.org/configuration/node/
*
* We also dont want webpack to transpile the stuff in node_modules folder, so we use the
* webpack-node-externals plugin.
*/
const webpackOptions = {
  entry: mainAppEntryPoint,
  output: {
    filename: 'index.js',
    path: srcDir
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },
  mode: process.env.NODE_ENV,
  target: 'node',
  devtool: ISDEV ? 'source-map' : 'none',
  context: projectDir,
  module: {
    rules: [
      {
        test: /\.lsc$/,
        exclude: [
          /(node_modules)/
        ],
        loader: 'babel-loader',
        options: {
          sourceMap: ISDEV,
          presets: [
            [
              "@lightscript",
              {
                "env": {
                  "targets": {
                    "node": 8
                  }
                }
              }
            ]
          ]
        }
      },
    ]
  },
  resolve: {
    extensions: ['.lsc', '.js']
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false
  }
}

module.exports = webpackOptions
