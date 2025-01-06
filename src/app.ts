import express from "express";
import path from "path";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import { config } from "dotenv";
config();

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(
        process.cwd(),
        "src/locales",
        "{{lng}}",
        "{{ns}}.json"
      ),
    },
    detection: {
      order: ["querystring", "cookie"],
      caches: ["cookie"],
    },
    fallbackLng: "en",
    preload: ["en", "am"],
  });

import "./bot/bot";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(middleware.handle(i18next));

app.use("/", (_, res) => {
  res.send(
    "Welcome to the Habeshops Telegram bot api that is used for getting and setting user's telegram bot"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
