// Hands the bot token + chat ids to the browser so it can send the photo
// album directly to Telegram (bypassing Vercel's request-size limit, same
// reasoning as the Drive OAuth token).
module.exports = async (req, res) => {
  res.status(200).json({
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatIds: (process.env.TELEGRAM_CHAT_ID || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  });
};
