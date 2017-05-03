const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cmrhConf = require('../cmrh.conf');

const context = path.resolve(__dirname, '../src/client');

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      context,
    ],
  },
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, 'src/server/static'),
    filename: '[name].js',
    publicPath: '/js/',
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        context,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEV': JSON.stringify(process.env.DEV),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
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
                    context,
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
