import { Context } from "telegraf";
import i18next from "i18next";
import { messageParser } from "../utils";

const defaultLang = process.env.DEFAULT_LANG || "en";
const supportAddress = process.env.SUPPORT_ADDRESS || "support@habeshops.com";
const photoURL =
  "https://i.ibb.co/WHJ6TzJ/Leonardo-Phoenix-10-Create-a-vibrant-advertisement-for-Habesho-3.jpg";

export const startCommand = async (ctx: Context) => {
  if (ctx.from?.is_bot) {
    const rejectionMessage = i18next.t("welcome.bot", {
      lng: ctx.from?.language_code || defaultLang,
      support_address: supportAddress,
    });
    return await ctx.reply(rejectionMessage);
  }

  const welcomeMessage = i18next.t("welcome.message", {
    lng: ctx.from?.language_code || defaultLang,
    user_name: ctx.from?.username || ctx.from?.first_name || "New User",
    support_address: supportAddress,
  });

  await ctx.replyWithPhoto(
    { url: photoURL },
    { caption: messageParser(welcomeMessage), parse_mode: "MarkdownV2" }
  );
};
