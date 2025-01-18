import TelegramBot, { Message } from "node-telegram-bot-api";
import i18next from "i18next";
import axios from "axios";
import {
  checkUsernameExists,
  checkIfTheUserIsBanned,
  generateHashedPassword,
} from "./";

const defaultLang = process.env.DEFAULT_LANG || "en";
const self = process.env.PROJECT_URL as string;
const backend = process.env.BACKEND_URL as string;
const supportAddress = process.env.SUPPORT_ADDRESS || "support@habeshops.com";

const sendRejectionMessage = async (
  bot: TelegramBot,
  msg: Message,
  rejectionKey: string
) => {
  const rejectionMessage = i18next.t(rejectionKey, {
    lng: msg.from?.language_code || defaultLang,
    support_address: supportAddress,
  });
  await bot.sendMessage(msg.chat.id, rejectionMessage);
};

const register = async (msg: Message) => {
  try {
    const password = generateHashedPassword(
      msg.from?.id as number,
      msg.from?.username as string
    );

    await axios.post(`${self}/register`, {
      username: msg.from?.username as string,
      first_name: msg.from?.first_name as string,
      last_name: msg.from?.last_name as string,
      language_code: msg.from?.language_code as string,
      password,
    });
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const userChecker = async (bot: TelegramBot, msg: Message) => {
  try {
    if (msg.from?.is_bot) {
      await sendRejectionMessage(bot, msg, "welcome.bot");
      return;
    }

    if (
      msg.from?.username &&
      (await checkIfTheUserIsBanned(backend, msg.from.username))
    ) {
      await sendRejectionMessage(bot, msg, "welcome.banned");
      return;
    }

    if (
      !msg.from?.username ||
      !(await checkUsernameExists(backend, msg.from.username))
    ) {
      await register(msg);
    }
  } catch (error) {
    console.error("Error checking user:", error);
    await sendRejectionMessage(bot, msg, "welcome.error");
  }
};
