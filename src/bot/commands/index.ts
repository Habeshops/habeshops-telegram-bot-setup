import { bot } from "../bot";
import { helpCommand } from "./help";
import { startCommand } from "./start";

bot.start(startCommand);
bot.help(helpCommand)