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
  const serverOptions = {
    port: config.SERVER_PORT,
    routes: {
      cors: true,
      payload: {
        maxBytes: 20971520,
      },
      files: {
        relativeTo: path.join(__dirname, "../../public"),
      },
    },
  };

  const server = new Server(serverOptions);
  server.state("token", {
    ttl: 24 * 60 * 60 * 1000, // One day
    isSecure: false,
    isHttpOnly: true,
    encoding: "base64json",
    clearInvalid: true,
    strictHeader: true,
  });
  // register plugin
  await server.register(plugins);
  initAuth(server);
  // register modules
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
  } catch (e) {
    logger.error(e.message);
  }
};
