import { Sequelize } from "sequelize";
import config from "@utils/config";

export const sequelize = new Sequelize(config.SYSTEM_DB, config.DB_USER, config.DB_PASSWORD, {
  dialect: "postgres",
  port: Number(config.DB_PORT),
});

sequelize.authenticate();
