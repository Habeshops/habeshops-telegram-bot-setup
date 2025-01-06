import { Context } from "telegraf";
import i18next from "i18next";
import { messageParser } from "../utils";

export const startCommand = async (ctx: Context) => {
  const default_lang = process.env.DEFAULT_LANG || "en";
  const support_address =
    process.env.SUPPORT_ADDRESS || "support@habeshops.com";

  const welcomeMessage = i18next.t("welcome.message", {
    lng: ctx.from?.language_code || default_lang,
    user_name: ctx.from?.username || ctx.from?.first_name || "New User",
    support_address: support_address,
  });

  const rejectionMessage = i18next.t("welcome.bot", {
    lng: ctx.from?.language_code || default_lang,
    support_address: support_address,
  });

  if (ctx.from?.is_bot) {
    await ctx.reply(rejectionMessage);
  } else {
    await ctx.replyWithPhoto(
      {
        url: "https://i.ibb.co/WHJ6TzJ/Leonardo-Phoenix-10-Create-a-vibrant-advertisement-for-Habesho-3.jpg",
      },
      { caption: messageParser(welcomeMessage), parse_mode: "MarkdownV2" }
    );
  }
};
