import { Context, Telegraf } from "telegraf";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const bot = new Telegraf<Context>(token);

import "./commands";

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
