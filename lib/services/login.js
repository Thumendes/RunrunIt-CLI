"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const logger_1 = require("../utils/logger");
const config_1 = require("./config");
function login() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const config = (yield config_1.ConfigService.get()) || {};
        const logger = new logger_1.LoggerModule("login");
        if (!config.APP_KEY) {
            logger.warn("Set your APP_KEY");
            logger.info("To paste your APP_KEY, click the right mouse button");
            const { appKey } = yield inquirer_1.default.prompt({
                type: "input",
                name: "appKey",
                message: "Enter your app key:",
                validate: (value) => {
                    if (!value)
                        return "Please enter your app key";
                    return true;
                },
            });
            config.APP_KEY = appKey;
            yield config_1.ConfigService.set({ APP_KEY: appKey });
        }
        if (!config.USER_TOKEN) {
            logger.warn("Set your USER_TOKEN");
            logger.info("To paste your APP_KEY, click the right mouse button");
            const { userToken } = yield inquirer_1.default.prompt({
                type: "input",
                name: "userToken",
                message: "Enter your user token:",
                validate: (value) => {
                    if (!value)
                        return "Please enter your user token";
                    return true;
                },
            });
            config.USER_TOKEN = userToken;
            yield config_1.ConfigService.set({ USER_TOKEN: userToken });
        }
        return config;
    });
}
exports.login = login;
