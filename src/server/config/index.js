import database from './database';

const config = {
  development: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || 'localhost',
    SESSION_STORE: {
      host: process.env.SESSION_STORE_HOST,
      port: process.env.SESSION_STORE_PORT,
    },

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,

    DEV: true,
  },

  production: {
    PORT: process.env.PORT || 8000,
    HOST: process.env.HOST || 'localhost',
    SESSION_STORE: {
      host: process.env.SESSION_STORE_HOST,
      port: process.env.SESSION_STORE_PORT,
    },

    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,

    MAILER_USER: process.env.MAILER_USER,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,
  },

  test: {},
};

export default {
  DB: database[process.env.NODE_ENV],
  ...config[process.env.NODE_ENV],
};
