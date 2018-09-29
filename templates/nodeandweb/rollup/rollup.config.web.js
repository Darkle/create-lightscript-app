import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

// Load babelrc
const babelRC = require('./.babelrc.web.js')
babelRC.babelrc = false
babelRC.extensions = [".js", ".lsc"]

// Locate LSC preset
const lscPreset = babelRC.presets.find(x => x[0] === "@lightscript")
if(!lscPreset) {
  throw new Error("Couldn't locate lightscript preset aborting build")
}

export default {
  input: 'src/frontend/index.lsc',
  plugins: [
    resolve({ extensions: babelRC.extensions }),
    //commonjs plugin needs to be before babel plugin
    commonjs({
      include: 'node_modules/**',
    }),
    babel(babelRC),
  ],
  output: {
    file: `dist/index.js`,
    format: 'cjs',
    sourcemap: process.env.NODE_ENV !== 'production' ? 'inline' : false
  }
}
