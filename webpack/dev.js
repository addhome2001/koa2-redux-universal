const WebpackNotifierPlugin = require('webpack-notifier');
const getDefaultConfig = require('./getDefaultConfig');

const { entry, output, plugins, resolve, loaders } = getDefaultConfig('src');

module.exports = {
  devtool: 'eval',
  entry,
  output: {
    ...output,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  mode: 'development',
  plugins: plugins.core.concat([
    ...plugins.getLoadersOptionsPlugin(),
    ...plugins.getEnvPlugin({ NODE_ENV: 'development' }),
    ...plugins.getHtmlPlugin(),
    new WebpackNotifierPlugin(),
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
