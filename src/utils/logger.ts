import chalk from "chalk";

export class LoggerModule {
  // create loggers for each log level: info, warn, error, success
  // each logger will have a unique color
  // each logger will have a unique level prefix

  // if this instance has a module prefix set, use it

  constructor(public module?: string) {}

  public log(level: string, ...logs: any[]) {
    let log = "";

    if (this.module) {
      log = chalk.bold.gray(`[${this.module}] `);
    }

    log += chalk.bold(level);

    console.log(log, ...logs);
  }

  public info(...logs: any[]) {
    this.log(chalk.cyan("info"), ...logs);
  }

  public warn(...logs: any[]) {
    this.log(chalk.yellow("warn"), ...logs);
  }

  public error(...logs: any[]) {
    this.log(chalk.red("error"), ...logs);
  }

  public success(...logs: any[]) {
    this.log(chalk.green("success"), ...logs);
  }

  public debug(...logs: any[]) {
    this.log(chalk.magenta("debug"), ...logs);
  }
}

export const logger = new LoggerModule();
