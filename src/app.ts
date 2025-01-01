import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/", (_, res) => {
  res.send(
    "Welcome to the Habeshops Telegram bot api that is used for getting and setting user's telegram bot"
  );
});

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })

export default app;
