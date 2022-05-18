import { ConfigKey } from "./types";

export const APP_NAME = "RunRunIt" as const;

export const APP_DESCRIPTION = "Runrunit CLI Helper" as const;

export const CONFIG_PATH = ".runrunit.config.json" as const;

export const CONFIG_KEYS: readonly ConfigKey[] = [
  "APP_KEY",
  "USER_TOKEN",
  "LAST_CARD_ID",
] as const;
