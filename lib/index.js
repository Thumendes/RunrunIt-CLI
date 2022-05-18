"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const login_1 = require("./services/login");
const presentation_1 = require("./utils/presentation");
const commander_1 = require("commander");
const config_1 = require("./data/config");
const logger_1 = require("./utils/logger");
const config_2 = require("./services/config");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const api_1 = require("./services/api");
function main() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield (0, presentation_1.presentation)();
        yield (0, login_1.login)();
        const program = new commander_1.Command()
            .name(config_1.APP_NAME)
            .description(config_1.APP_DESCRIPTION)
            .version("0.0.1");
        const runrunitService = new api_1.RunrunitService();
        yield runrunitService.prepare();
        program
            .command("set <key> <value>")
            .action((key, value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ok = config_2.ConfigService.validateKey(key);
            if (!ok) {
                logger_1.logger.error(`Invalid key: ${key}`);
                logger_1.logger.info("Valid keys are:", config_1.CONFIG_KEYS.join(", "));
                return;
            }
            logger_1.logger.info(`Setting ${key} to ${value}`);
            yield config_2.ConfigService.set({ [key]: value });
            logger_1.logger.success(`${key} set to ${value}`);
        }));
        function playOrPause(type) {
            return (cardId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const previousCardId = yield config_2.ConfigService.get("LAST_CARD_ID");
                if (!cardId) {
                    const { value } = yield inquirer_1.default.prompt({
                        type: "number",
                        name: "value",
                        message: "Enter card id:",
                        default: previousCardId,
                    });
                    cardId = value.toString();
                }
                const service = type === "play" ? runrunitService.playCard : runrunitService.pauseCard;
                const task = yield service(Number(cardId)).catch((error) => {
                    var _a;
                    logger_1.logger.error("Error playing card");
                    logger_1.logger.error("API Response", (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                });
                logger_1.logger.debug("Card: ", task);
                if (task) {
                    logger_1.logger.success(`${type} card ${cardId}`);
                }
                yield config_2.ConfigService.set({ LAST_CARD_ID: cardId });
            });
        }
        program.command("play [cardId]").action(playOrPause("play"));
        program.command("pause [cardId]").action(playOrPause("pause"));
        program.parse();
    });
}
main().catch((err) => { });
