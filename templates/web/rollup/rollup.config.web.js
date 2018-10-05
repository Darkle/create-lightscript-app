import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

const ISDEV = process.env.NODE_ENV !== 'production'
const babelRC = {
  presets: [
    [
      "@lightscript",
      {
        "env": {
          targets: { ie: 9 },
          ignoreBrowserslistConfig: true,
          useBuiltIns: false,
          modules: false
        }
      }
    ]
  ],
  plugins: [
    // Polyfill Babel runtime
    ['@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
      }
    ],
    // Allow the use of generators
    ['@babel/plugin-transform-regenerator',
      { async: false }
    ]
  ],
  babelrc: false,
  extensions: [".js", ".lsc"]
}

export default {
  input: 'src/index.lsc',
  plugins: [
    resolve({ extensions: babelRC.extensions }),
    //commonjs plugin needs to be before babel plugin
    commonjs({
      include: 'node_modules/**',
    }),
    babel(babelRC),
    postcss({
      minimize: !ISDEV
    })
  ],
  output: {
    file: `dist/index.js`,
    format: 'cjs',
    sourcemap: ISDEV ? 'inline' : false
  }
}
