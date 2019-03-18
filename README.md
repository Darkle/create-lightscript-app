# create-lightscript-app

This will create a minimal skeleton for a [LightScript](https://wcjohnson.github.io/lightscript/docs/) app.

It supports creating a skeleton app for the web (default) or for the server or both.

## Web
* This is the default.
* To create a LightScript skeleton for the web, run `npx lightscript-app app-name`
* The web skeleton includes [Browsersync](https://www.browsersync.io/) & [PostCSS](https://postcss.org/). PostCSS is set up so that you can use sass, less, stylus or regular css.
* To start development, run `npm start`

## Node
* To create a LightScript skeleton for the server, run `npx lightscript-app app-name --node`
* The node skeleton includes [nodemon](https://github.com/remy/nodemon#nodemon) which will automatically restart the server on changes.
* To start development, run `npm start`

## Node And Web
* To create a LightScript skeleton for an app for both the server the and web, run `npx lightscript-app app-name --nodeandweb`
* This skeleton inlcudes everything from both the Web and Node skeletons above.
* To start development, run `npm start`

## Rollup and Webpack
* By default the skeletons will use [Rollup](https://rollupjs.org) to transpile code. If you want to use Webpack instead, use the `--webpack` flag. e.g. `npm init lightscript-app app-name --webpack`
