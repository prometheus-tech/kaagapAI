require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: process.env.HOST_DEV
  },
  test: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: process.env.HOST_TEST
  },
  production: {
    ssl: false,
    port: process.env.PORT || 4000,
    hostname: process.env.HOST_PROD
  }
};
