"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentation = void 0;
const tslib_1 = require("tslib");
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const config_1 = require("../data/config");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
function presentation() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const log = figlet_1.default.textSync(config_1.APP_NAME, {
            font: "Small Slant",
        });
        console.log(chalk_1.default.red(log));
    });
}
exports.presentation = presentation;
