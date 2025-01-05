import { Context } from "telegraf";
import i18next from "i18next";

export const startCommand = (ctx: Context) => {
  const welcomeMessage = i18next.t("welcome.message", {
    lng: ctx.from?.language_code || "en",
  });
  console.log(ctx.from)
  ctx.reply(welcomeMessage);
};
