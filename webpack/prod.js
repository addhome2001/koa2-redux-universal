const webpack = require('webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const getDefaultConfig = require('./getDefaultConfig');

const { entry, output, plugins, resolve, loaders } = getDefaultConfig(
  'build',
  false,
);

module.exports = {
  target: 'web',
  entry,
  output: {
    ...output,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
      }),
    ],

    // *** Code-spliting Section ***
    splitChunks: {
      cacheGroups: {
        /**
          * extract vendor
          * 將路徑有node_modules的模組分開打包
          * 並命名為vendor
          */
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
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
    new webpack.optimize.AggressiveMergingPlugin(),

    // *** Manifest Section ***
    new InlineManifestWebpackPlugin('runtime'),

    new PreloadWebpackPlugin({
      rel: 'prefetch',
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ]),
  resolve,
  module: {
    rules: loaders.core.concat([
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, ...loaders.css],
      },
    ]),
  },
};
