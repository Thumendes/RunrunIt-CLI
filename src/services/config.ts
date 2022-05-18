import path from "path";
import { homedir } from "os";

import { CONFIG_KEYS, CONFIG_PATH } from "../data/config";
import { readJSON, writeJSON } from "../utils/files";

import type { Config, ConfigKey } from "../data/types";

export class ConfigService {
  static getConfigPath() {
    return path.join(homedir(), CONFIG_PATH);
  }

  static async get(key?: undefined): Promise<Config>;
  static async get<Key extends ConfigKey>(key?: Key): Promise<Config[Key]>;
  static async get(key?: ConfigKey): Promise<Config | ConfigKey> {
    const path = ConfigService.getConfigPath();
    const config = await readJSON(path);
    return key ? config[key] : config;
  }

  static async set(config: Partial<Config>): Promise<void> {
    const path = ConfigService.getConfigPath();
    await writeJSON(config, path);
  }

  static validateKey(key: string): key is ConfigKey {
    return (CONFIG_KEYS as string[]).includes(key);
  }
}
