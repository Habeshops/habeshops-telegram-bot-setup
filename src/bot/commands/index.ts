import { bot } from "../bot";
import { helpCommand } from "./help";
import { newBot } from "./newBot";
import { startCommand } from "./start";


bot.start(startCommand);
bot.command("new", newBot);
bot.help(helpCommand)