const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (dest, __DEV__ = true) => {
  const entryPath = path.resolve(__dirname, `../${dest}/client`);
  const distPath = path.resolve(__dirname, `../${dest}/server/static/assets`);
  const srcTemplate = path.resolve(__dirname, '../templates/index.ejs');
  const distTemplate = path.resolve(__dirname, `../${dest}/server/views/index.ejs`);
  const favicon = path.resolve(__dirname, '../favicon.ico');

  return {
    entry(externals = []) {
      return {
        bundle: externals.concat(entryPath),
      };
    },
    output(externals = {}) {
      return Object.assign({
        path: distPath,
        publicPath: '/assets/',
      }, externals);
    },
    plugins: {
      env(options = {}) {
        return new webpack.EnvironmentPlugin(Object.assign({
          __DEV__,
        }, options));
      },
      html(options = {}) {
        return new HtmlWebpackPlugin(Object.assign({
          template: srcTemplate,
          filename: distTemplate,
          favicon,
        }, options));
      },
      loadersOptions(externals = {}) {
        return new webpack.LoaderOptionsPlugin(Object.assign({
          options: {
            context: entryPath,
          },
        }, externals));
      },
      core: [
        new webpack.ProvidePlugin({
          Promise: 'es6-promise',
          fetch: 'isomorphic-fetch',
        }),
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules'],
    },
    loaders: {
      css: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            autoprefixer: __DEV__,
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
      core: [
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
              },
            },
          ],
        },
      ],
    },
  };
};
