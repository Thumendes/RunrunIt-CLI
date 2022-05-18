import inquirer from "inquirer";
import { LoggerModule } from "../utils/logger";
import { ConfigService } from "./config";

export async function login() {
  const config = (await ConfigService.get()) || {};
  const logger = new LoggerModule("login");

  if (!config.APP_KEY) {
    logger.warn("Set your APP_KEY");
    logger.info("To paste your APP_KEY, click the right mouse button");

    const { appKey } = await inquirer.prompt({
      type: "input",
      name: "appKey",
      message: "Enter your app key:",
      validate: (value) => {
        if (!value) return "Please enter your app key";
        return true;
      },
    });

    config.APP_KEY = appKey;
    await ConfigService.set({ APP_KEY: appKey });
  }

  if (!config.USER_TOKEN) {
    logger.warn("Set your USER_TOKEN");
    logger.info("To paste your APP_KEY, click the right mouse button");

    const { userToken } = await inquirer.prompt({
      type: "input",
      name: "userToken",
      message: "Enter your user token:",
      validate: (value) => {
        if (!value) return "Please enter your user token";
        return true;
      },
    });

    config.USER_TOKEN = userToken;
    await ConfigService.set({ USER_TOKEN: userToken });
  }

  return config;
}
