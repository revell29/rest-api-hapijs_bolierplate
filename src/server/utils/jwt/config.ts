import config from "@utils/config";
import dotenv from "dotenv";
import { checkJwt } from "@utils/checkJwt";

dotenv.config();

export default {
  jwtSecret: `${process.env.JWT_TOKEN}`,
  jwtTimer: "24h",
};

export function initAuth(server: any) {
  server.auth.strategy("jwt", "jwt", {
    key: config.JWT_KEY,
    validate: checkJwt,
    verifyOptions: { algorithms: ["HS256"] },
  });
}
