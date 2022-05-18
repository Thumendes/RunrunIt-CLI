"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerModule = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class LoggerModule {
    // create loggers for each log level: info, warn, error, success
    // each logger will have a unique color
    // each logger will have a unique level prefix
    // if this instance has a module prefix set, use it
    constructor(module) {
        this.module = module;
    }
    log(level, ...logs) {
        let log = "";
        if (this.module) {
            log = chalk_1.default.bold.gray(`[${this.module}] `);
        }
        log += chalk_1.default.bold(level);
        console.log(log, ...logs);
    }
    info(...logs) {
        this.log(chalk_1.default.cyan("info"), ...logs);
    }
    warn(...logs) {
        this.log(chalk_1.default.yellow("warn"), ...logs);
    }
    error(...logs) {
        this.log(chalk_1.default.red("error"), ...logs);
    }
    success(...logs) {
        this.log(chalk_1.default.green("success"), ...logs);
    }
    debug(...logs) {
        this.log(chalk_1.default.magenta("debug"), ...logs);
    }
}
exports.LoggerModule = LoggerModule;
exports.logger = new LoggerModule();
