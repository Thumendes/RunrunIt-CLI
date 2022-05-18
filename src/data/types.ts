export interface Config {
  APP_KEY?: string;
  USER_TOKEN?: string;
  LAST_CARD_ID?: string;
}
export type ConfigKey = keyof Config;
