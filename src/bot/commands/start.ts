import TelegramBot, { Message } from "node-telegram-bot-api";
import i18next from "i18next";
import {
  messageParser,
  userChecker,
} from "../utils";

const defaultLang = process.env.DEFAULT_LANG || "en";
const supportAddress = process.env.SUPPORT_ADDRESS || "support@habeshops.com";
const photoURL =
  "https://i.ibb.co/WHJ6TzJ/Leonardo-Phoenix-10-Create-a-vibrant-advertisement-for-Habesho-3.jpg";

const inline_buttons = [
  [
    {
      text: "🏬 New Shop",
      callback_data: "new_shop",
    },
    {
      text: "📂 My Shops",
      callback_data: "my_shops",
    },
  ],
  [
    {
      text: "🌐 Language",
      callback_data: "language",
    },
    {
      text: "❓ Help",
      callback_data: "help",
    },
  ],
];

export const startCommand = async (bot: TelegramBot, msg: Message) => {
  userChecker(bot, msg);
  const welcomeMessage = i18next.t("welcome.message", {
    lng: msg.from?.language_code || defaultLang,
    user_name: msg.from?.username || msg.from?.first_name || "New User",
    support_address: supportAddress,
  });

  return await bot.sendPhoto(msg.chat.id, photoURL, {
    caption: messageParser(welcomeMessage),
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: inline_buttons,
      remove_keyboard: true,
    },
  });
};
