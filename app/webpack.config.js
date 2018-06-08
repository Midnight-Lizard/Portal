const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  return {
    mode: 'none',
    entry: {
      // This is our Express server for Dynamic universal
      server: './server.ts',
      // This is an example of Static prerendering (generative)
      prerender: './prerender.ts'
    },
    target: 'node',
    resolve: { extensions: ['.ts', '.js'] },
    // Make sure we include all node_modules etc
    externals: [/node_modules/],
    output: {
      // Puts the output at the root of the dist folder
      path: path.join(__dirname, 'dist'),
      filename: 'portal-[name].js'
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' },
        {
          // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
          // Removing this will cause deprecation warnings to appear.
          test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
          parser: { system: true },
        }
      ].concat(isDevBuild ?
        [ // dev
          {
            // loading source maps from main.js files
            test: /main\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
          }
        ] : [ // prod
        ])
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        // fixes WARNING Critical dependency: the request of a dependency is an expression
        /(.+)?angular(\\|\/)core(.+)?/,
        path.join(__dirname, 'src'), // location of your src
        {} // a map of your routes
      ),
      new webpack.ContextReplacementPlugin(
        // fixes WARNING Critical dependency: the request of a dependency is an expression
        /(.+)?express(\\|\/)(.+)?/,
        path.join(__dirname, 'src'),
        {}
      )
    ].concat(isDevBuild ?
      [ // dev
        new webpack.SourceMapDevToolPlugin({
          filename: '[file].map',
          moduleFilenameTemplate: path.relative('./dist', '[resourcePath]')
        })
      ] :
      [ // prod
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: false,
            compress: false,
            comments: false
          }
        })
      ])
  }
}