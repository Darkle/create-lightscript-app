module.exports = {
  parser: "@lightscript/eslint-plugin",
  plugins: ["@lightscript/eslint-plugin"],
  extends: [
    "eslint:recommended",
    "plugin:@lightscript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
}
