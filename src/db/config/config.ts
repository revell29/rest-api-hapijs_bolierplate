import configs from "../../server/utils/config";

const devConfig = {
  development: {
    username: configs.DB_USER,
    password: configs.DB_PASSWORD,
    database: configs.SYSTEM_DB,
    host: configs.DB_HOST,
    dialect: configs.DB_DRIVER,
  },
  production: {
    username: configs.DB_USER,
    password: configs.DB_PASSWORD,
    database: configs.SYSTEM_DB,
    host: configs.DB_HOST,
    dialect: configs.DB_DRIVER,
  },
};

module.exports = devConfig;
