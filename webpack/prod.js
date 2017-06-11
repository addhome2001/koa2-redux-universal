const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cmrhConf = require('../cmrh.conf');

const NODE_ENV = process.env.NODE_ENV || 'production';

const entryPath = path.resolve(__dirname, '../src/client');
const distPath = path.resolve(__dirname, '../dist/server/static/assets');
const srcTemplate = path.resolve(__dirname, '../templates/index.ejs');
const distTemplate = path.resolve(__dirname, '../dist/server/views/index.ejs');

module.exports = {
  entry: {
    bundle: entryPath,
  },
  output: {
    path: distPath,
    filename: '[name].[chunkhash:8].js',
    publicPath: '/assets/',
  },
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: entryPath,
        postcss: [
          precss,
          autoprefixer({ browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9'] }),
        ],
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      __DEV__: false,
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'isomorphic-fetch',
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: srcTemplate,
      filename: distTemplate,
    }),
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
              plugins: [
                [
                  'react-css-modules',
                  {
                    context: entryPath,
                    generateScopedName: cmrhConf.generateScopedName,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: cmrhConf.generateScopedName,
                autoprefixer: false,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },
};
