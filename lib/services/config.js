"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const os_1 = require("os");
const config_1 = require("../data/config");
const files_1 = require("../utils/files");
class ConfigService {
    static getConfigPath() {
        return path_1.default.join((0, os_1.homedir)(), config_1.CONFIG_PATH);
    }
    static get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const path = ConfigService.getConfigPath();
            const config = yield (0, files_1.readJSON)(path);
            return key ? config[key] : config;
        });
    }
    static set(config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const path = ConfigService.getConfigPath();
            yield (0, files_1.writeJSON)(config, path);
        });
    }
    static validateKey(key) {
        return config_1.CONFIG_KEYS.includes(key);
    }
}
exports.ConfigService = ConfigService;
