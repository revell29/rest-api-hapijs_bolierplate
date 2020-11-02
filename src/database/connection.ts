import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

export const connection = async () => {
  mongoose
    .connect(`${process.env.MONGO_DB_PROD}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => {
      console.info(chalk.white(`Database connected 🚀`));
    })
    .catch((err) => console.log(err));
};
