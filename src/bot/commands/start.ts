import TelegramBot, { Message } from "node-telegram-bot-api";
import i18next from "i18next";
import {
  messageParser,
  checkUsernameExisits,
  checkIfTheUserIsBanned,
} from "../utils";

const defaultLang = process.env.DEFAULT_LANG || "en";
const self = process.env.PROJECT_URL as string;
const backend = process.env.BACKEND_URL as string;
const supportAddress = process.env.SUPPORT_ADDRESS || "support@habeshops.com";
const photoURL =
  "https://i.ibb.co/WHJ6TzJ/Leonardo-Phoenix-10-Create-a-vibrant-advertisement-for-Habesho-3.jpg";

export const startCommand = async (bot: TelegramBot, msg: Message) => {
  if (msg.from?.is_bot) {
    const rejectionMessage = i18next.t("welcome.bot", {
      lng: msg.from?.language_code || defaultLang,
      support_address: supportAddress,
    });
    return await bot.sendMessage(msg.chat.id, rejectionMessage);
  } else if (
    msg.from?.username &&
    (await checkIfTheUserIsBanned(backend, msg.from.username))
  ) {
    const rejectionMessage = i18next.t("welcome.banned", {
      lng: msg.from?.language_code || defaultLang,
      support_address: supportAddress,
    });
    return await bot.sendMessage(msg.chat.id, rejectionMessage);
  } else if (
    msg.from?.username &&
    (await checkUsernameExisits(backend, msg.from.username))
  ) {
    const welcomeMessage = i18next.t("welcome.welcomeBack", {
      lng: msg.from?.language_code || defaultLang,
      support_address: supportAddress,
    });
    return await bot.sendPhoto(msg.chat.id, photoURL, {
      caption: messageParser(welcomeMessage),
      parse_mode: "MarkdownV2",
    });
  }

  const welcomeMessage = i18next.t("welcome.message", {
    lng: msg.from?.language_code || defaultLang,
    user_name: msg.from?.username || msg.from?.first_name || "New User",
    support_address: supportAddress,
  });

  return await bot.sendPhoto(msg.chat.id, photoURL, {
    caption: messageParser(welcomeMessage),
    parse_mode: "MarkdownV2",
  });
};
