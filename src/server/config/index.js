const config = {
  development: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || 'localhost',

    DEV: true,
  },

  production: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || 'localhost',
  },

  test: {},
};

export default config[process.env.NODE_ENV];
