import "module-alias/register";
import { Server } from "@hapi/hapi";
import plugins from "@utils/plugin";
import path from "path";
import modules from "@modules/index";
import config from "./utils/config";
import logger from "@utils/logger";
import { initAuth } from "@utils/jwt/config";
import chalk from "chalk";

const serverInit = async (): Promise<Server> => {
  const server = new Server({
    host: "localhost",
    port: config.SERVER_PORT,
    routes: {
      cors: {
        origin: [config.ORIGIN],
      },
      files: {
        relativeTo: path.join(__dirname, "../../public"),
      },
    },
  });

  await server.register(plugins);
  initAuth(server);
  await server.register(modules);
  return server;
};

export const startServer = async (): Promise<void> => {
  try {
    const server: Server = await serverInit();
    server.start();
    server.events.on("response", function (request: any) {
      logger.info(
        `${chalk.cyan(`[${request.info.remoteAddress}]`)}: ${request.method.toUpperCase()} ${
          request.path
        } ${chalk.cyan(request.response.statusCode)}`
      );
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(config);
    }

    console.info(chalk.white(`Server running at: ${server.info.uri} 🚀`));
    // DB Connection
    // connection();
  } catch (e) {
    logger.error(e.message);
  }
};
