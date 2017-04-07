const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cmrhConf = require('../cmrh.conf');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../dist', 'client'),
  },
  output: {
    path: path.resolve(__dirname, '../dist', 'server/static/js'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [
          precss,
          autoprefixer({ browsers: ['ff >= 3.5', 'Chrome > 3.5', 'iOS < 7', 'ie < 9'] }),
        ],
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'isomorphic-fetch',
    }),
    new ExtractTextPlugin({
      filename: '../css/app.css',
    }),
    new webpack.optimize.UglifyJsPlugin({
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
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
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
