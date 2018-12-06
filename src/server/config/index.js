const config = {
  development: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || '0.0.0.0',
    ENABLE_SSR: process.env.ENABLE_SSR,

    DEV: true,
  },

  production: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || '0.0.0.0',
    ENABLE_SSR: process.env.ENABLE_SSR,
  },

  test: {},
};

export default config[process.env.NODE_ENV];
