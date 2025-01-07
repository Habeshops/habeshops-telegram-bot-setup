import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const bot = new TelegramBot(token, { polling: true });

import "./commands";
