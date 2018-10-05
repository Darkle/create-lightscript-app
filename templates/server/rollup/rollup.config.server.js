import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
const path = require('path')

const srcPath = (path.resolve('./app')).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
const srcPathRegex = new RegExp(srcPath)

const babelRC = {
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
  ],
  babelrc: false,
  extensions: [".js", ".lsc"]
}
// Attempt to determine if a module is external and should not be rolled into
// the bundle. Check for presence in source path, presence of "." in module path,
// or special module paths.
function isExternal(modulePath) {
  // "babelHelpers" must be treated as internal or babel-plugin-external-helpers will break
  if(/babelHelpers/.test(modulePath)) return false

  // "." in module path = internal
  if(/\.\//.test(modulePath)) return false

  // Otherwise, attempt to figure out whether the module is inside the source tree.
  modulePath = path.resolve(modulePath)
  return !(srcPathRegex.test(modulePath))
}

export default {
  input: 'src/index.lsc',
  plugins: [
    resolve({ extensions: babelRC.extensions }),
    babel(babelRC)
  ],
  external: isExternal,
  output: {
    file: `src/index.js`,
    format: 'cjs',
    sourcemap: process.env.NODE_ENV !== 'production' ? 'inline' : false
  }
}
