const config = {
  development: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.IP || 'localhost',
    SESSION_STORE: process.env.SESSION_STORE && {
      host: process.env.SESSION_STORE,
      port: process.env.SESSION_STORE_PORT,
    },

    DB: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: 'mysql',
    },

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    DEV: true,
  },

  production: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.IP || 'localhost',
    SESSION_STORE: process.env.SESSION_STORE && {
      host: process.env.SESSION_STORE,
      port: process.env.SESSION_STORE_PORT,
    },

    DB: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: 'mysql',
    },

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },

  test: {},
};

export default config[process.env.NODE_ENV];
