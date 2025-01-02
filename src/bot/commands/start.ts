import { Context } from "telegraf";

export const startCommand = (ctx: Context) => {
  ctx.reply(
    "Welcome to the Habeshops Telegram bot api that is used for getting and setting user's telegram bot"
  );
};
