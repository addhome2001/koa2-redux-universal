/* eslint-disable no-underscore-dangle */
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cmrhConf = require('../cmrh.conf');

const entryPath = path.resolve(__dirname, '../src/client');
const distPath = path.resolve(__dirname, '../src/server/static/assets');
const srcTemplate = path.resolve(__dirname, '../templates/index.ejs');
const distTemplate = path.resolve(__dirname, '../src/server/views/index.ejs');
const favicon = path.resolve(__dirname, '../favicon.ico');

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      entryPath,
    ],
  },
  output: {
    path: distPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets/',
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: entryPath,
        postcss: [
          precss,
          autoprefixer({ browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9'] }),
        ],
      },
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'isomorphic-fetch',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      __DEV__: true,
    }),
    /**
     * Webpack will compile the template to src/server/views every time.
     */
    new HtmlWebpackPlugin({
      template: srcTemplate,
      filename: distTemplate,
      alwaysWriteToDisk: true,
      favicon,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: 'raw-loader',
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                [
                  'react-css-modules',
                  {
                    context: entryPath,
                    generateScopedName: cmrhConf.generateScopedName,
                    webpackHotModuleReloading: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: cmrhConf.generateScopedName,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
};
