export default {
  modulesRules: [
    {
      test: /\.ejs$/,
      use: 'raw-loader',
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
};
