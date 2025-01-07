import  TelegramBot  from 'node-telegram-bot-api';
import { bot } from "../bot";
import { startCommand } from "./start";


bot.onText(/\/start/, (msg: TelegramBot.Message) => {
  startCommand(bot, msg);
});