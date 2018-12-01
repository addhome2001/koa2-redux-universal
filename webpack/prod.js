const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const getDefaultConfig = require('./getDefaultConfig');

const { entry, output, plugins, resolve, loaders } = getDefaultConfig(
  'build',
  false,
);

module.exports = {
  target: 'web',
  devtool: 'cheap-source-map',
  entry,
  output: {
    ...output,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  plugins: plugins.core.concat([
    ...plugins.getLoadersOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    ...plugins.getEnvPlugin({ NODE_ENV: 'production' }),
    ...plugins.getHtmlPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
      parallel: true,
      cache: true,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),

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
    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),
  ]),
  resolve,
  module: {
    rules: loaders.core.concat([
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: loaders.css,
        }),
      },
    ]),
  },
};
