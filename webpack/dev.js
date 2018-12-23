/* eslint-disable no-underscore-dangle */
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const getDefaultConfig = require('./getDefaultConfig');

const { entry, output, plugins, resolve, loaders } = getDefaultConfig('src');

module.exports = {
  target: 'web',
  devtool: 'eval',
  mode: 'development',
  output: {
    ...output,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: plugins.core.concat([
    ...plugins.getLoadersOptionsPlugin(),
    ...plugins.getEnvPlugin({ NODE_ENV: 'development' }),
    ...plugins.getHtmlPlugin(),
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
