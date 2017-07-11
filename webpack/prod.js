const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const cmrhConf = require('../cmrh.conf');

const entryPath = path.resolve(__dirname, '../src/client');
const distPath = path.resolve(__dirname, '../dist/server/static/assets');
const srcTemplate = path.resolve(__dirname, '../templates/index.ejs');
const distTemplate = path.resolve(__dirname, '../dist/server/views/index.ejs');
const favicon = path.resolve(__dirname, '../favicon.ico');

module.exports = {
  entry: {
    bundle: entryPath,
  },
  output: {
    path: distPath,
    publicPath: '/assets/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'isomorphic-fetch',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: entryPath,
      },
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
    new HtmlWebpackPlugin({
      template: srcTemplate,
      filename: distTemplate,
      favicon,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),

    // *** Manifest Section ***
    new ChunkManifestPlugin(),
    new InlineChunkManifestHtmlWebpackPlugin(),
    new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest'],
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
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
