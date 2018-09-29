module.exports = {
  "presets": [
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
  ]
}
