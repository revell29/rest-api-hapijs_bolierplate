import dotenv from "dotenv";
dotenv.config();

export default {
  jwtSecret: `${process.env.JWT_TOKEN}`,
  jwtTimer: "24h",
};
