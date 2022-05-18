import { login } from "./services/login";
import { presentation } from "./utils/presentation";
import { Command } from "commander";
import { APP_DESCRIPTION, APP_NAME, CONFIG_KEYS } from "./data/config";
import { logger } from "./utils/logger";
import { ConfigService } from "./services/config";
import inquirer from "inquirer";
import { RunrunitService } from "./services/api";
import { AxiosError } from "axios";
import chalk from "chalk";

async function main() {
  await presentation();
  await login();

  const program = new Command()
    .name(APP_NAME)
    .description(APP_DESCRIPTION)
    .version("0.0.1");

  const runrunitService = new RunrunitService();
  await runrunitService.prepare();

  program
    .command("set <key> <value>")
    .action(async (key: string, value: string) => {
      const ok = ConfigService.validateKey(key);

      if (!ok) {
        logger.error(`Invalid key: ${key}`);
        logger.info("Valid keys are:", CONFIG_KEYS.join(", "));
        return;
      }

      logger.info(`Setting ${key} to ${value}`);

      await ConfigService.set({ [key]: value });

      logger.success(`${key} set to ${value}`);
    });

  function playOrPause(type: "play" | "pause") {
    return async (cardId: string) => {
      const previousCardId = await ConfigService.get("LAST_CARD_ID");

      if (!cardId) {
        const { value } = await inquirer.prompt({
          type: "number",
          name: "value",
          message: "Enter card id:",
          default: previousCardId,
        });

        cardId = value.toString();
      }

      const service =
        type === "play" ? runrunitService.playCard : runrunitService.pauseCard;

      const task = await service
        .bind(runrunitService)(Number(cardId))
        .catch((error: AxiosError) => {
          logger.error("Error playing card");
          logger.error("API Response", error.response?.data);
        });

      if (task) {
        logger.success(`${type} card ${cardId}: ${chalk.bold(task.title)}`);
      }
      await ConfigService.set({ LAST_CARD_ID: cardId });
    };
  }

  program.command("play [cardId]").action(playOrPause("play"));

  program.command("pause [cardId]").action(playOrPause("pause"));

  program.parse();
}

main().catch((err) => {});
