import figlet from "figlet";
import { APP_NAME } from "../data/config";
import chalk from "chalk";

export async function presentation() {
  const log = figlet.textSync(APP_NAME, {
    font: "Small Slant",
  });

  console.log(chalk.red(log));
}
