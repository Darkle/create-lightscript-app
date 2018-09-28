import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
const path = require('path')

const srcPath = (path.resolve('./app')).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
const srcPathRegex = new RegExp(srcPath)

// Load babelrc
const babelRC = require('./.babelrc.server.js')
babelRC.babelrc = false
babelRC.extensions = [".js", ".lsc"]

// Locate LSC preset
const lscPreset = babelRC.presets.find(x => x[0] === "@lightscript")
if(!lscPreset) {
  throw new Error("Couldn't locate lightscript preset aborting build")
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
  input: 'src/server/index.lsc',
  plugins: [
    resolve({ extensions: babelRC.extensions }),
    babel(babelRC)
  ],
  external: isExternal,
  output: {
    file: `src/server/index.js`,
    format: 'cjs',
    sourcemap: process.env.NODE_ENV !== 'production' ? 'inline' : false
  }
}
