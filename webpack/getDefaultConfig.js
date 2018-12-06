const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = (dest, __DEV__ = true) => {
  const entryPath = path.resolve(__dirname, '../src/client');
  const buildPath = path.resolve(__dirname, `../${dest}/server/static`);
  const templateSrc = path.resolve(__dirname, '../templates/index.ejs');
  const templateDest = path.resolve(__dirname, `../${dest}/server/views`);
  const favicon = path.resolve(__dirname, '../favicon.ico');

  return {
    entry: {
      bundle: [entryPath],
    },
    output: {
      path: buildPath,
      publicPath: '/',
    },
    plugins: {
      getEnvPlugin(options = {}) {
        return [
          new webpack.EnvironmentPlugin({
            __DEV__,
            ...options,
          }),
        ];
      },
      getHtmlPlugin(options = {}) {
        return [
          new HtmlWebpackPlugin({
            template: templateSrc,
            filename: 'index.ejs',
            alwaysWriteToDisk: true,
            favicon,
            ...options,
          }),
          /**
           * Webpack will always compile the template to xxx/server/views.
           */
          new HtmlWebpackHarddiskPlugin({
            outputPath: templateDest,
          }),
        ];
      },
      getLoadersOptionsPlugin(externals = {}) {
        return [
          new webpack.LoaderOptionsPlugin({
            options: {
              context: entryPath,
            },
            ...externals,
          }),
        ];
      },
      core: [
        new webpack.ProvidePlugin({
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
            context: entryPath,
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
