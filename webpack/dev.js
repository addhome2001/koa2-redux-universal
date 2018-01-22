/* eslint-disable no-underscore-dangle */
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const defConf = require('./default');

const { entry, output, plugins, resolve, loaders } = defConf('src');

module.exports = {
  target: 'web',
  devtool: 'eval',
  entry: entry(),
  output: output({
    filename: '[name].js',
    chunkFilename: '[name].js',
  }),
  plugins: plugins.core.concat([
    plugins.loadersOptions(),
    plugins.env({ NODE_ENV: 'development' }),
    plugins.html(),
    /**
     * Webpack will compile the template to src/server/views every time.
     */
    new HtmlWebpackHarddiskPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve,
  module: {
    rules: loaders.core.concat([
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          ...loaders.css,
        ],
      },
    ]),
  },
};
