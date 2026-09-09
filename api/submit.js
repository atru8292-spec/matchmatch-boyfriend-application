const { google } = require("googleapis");

const TEXT_FIELDS = [
  ["full_name", "Full name"],
  ["instagram", "Instagram"],
  ["age", "Age"],
  ["height_cm", "Height (cm)"],
  ["city", "City"],
  ["living_situation", "Living situation"],
  ["smoke", "Smokes"],
  ["drink", "Drinks"],
  ["religious", "Religion"],
  ["religious_detail", "Religion — how much it shapes daily life"],
  ["has_kids", "Has kids"],
  ["wants_kids", "Wants kids"],
  ["political_views", "Political views"],
  ["occupation", "Occupation"],
  ["income_usd", "Monthly income (USD)"],
  ["relationship_type", "Relationship type sought"],
  ["relationship_vision", "Relationship vision"],
  ["finances_handling", "Finances — approach"],
  ["finances_detail", "Finances — detail"],
  ["gender_roles", "Gender roles view"],
  ["good_partner_meaning", "Good partner means"],
  ["what_makes_you_great", "What makes them great"],
  ["looking_for_partner", "Looking for in a partner"],
  ["show_care", "How they show care"],
  ["why_good_match", "Why a good match"],
  ["non_negotiables", "Non-negotiables"],
  ["conflict_handling", "Conflict handling"],
  ["cheating_definition", "Cheating definition"],
  ["communication_skill", "Communication skill (0-10)"],
  ["life_focus", "Life focus"],
  ["parents_relationship", "Relationship with parents"],
  ["last_relationship_ended", "Last relationship ended"],
  ["therapy", "Been in therapy"],
  ["improving_self", "Improving in self"],
  ["love_language_give", "Love language — gives"],
  ["love_language_receive", "Love language — receives"],
  ["values", "Core values"],
  ["values_other", "Other values"],
  ["typical_week", "Typical week"],
  ["ideal_weekend", "Ideal weekend"],
];

function joinField(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
}

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  return new google.auth.JWT(email, null, key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) return;
  await Promise.all(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      })
    )
  );
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = req.body || {};
    const { folderLink, portraitLink, fulllengthLink, videoLink } = body;

    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const applicantName = joinField(body.full_name) || "Unnamed";

    // Append a row to the Google Sheet
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const row = [
      new Date().toISOString(),
      ...TEXT_FIELDS.map(([key]) => joinField(body[key])),
      portraitLink || "",
      fulllengthLink || "",
      videoLink || "",
      folderLink || "",
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Responses!A:A",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    // Notify Telegram
    const summary = [
      `<b>New boyfriend application</b>`,
      `${applicantName} · ${joinField(body.age)} y/o · ${joinField(body.city)}`,
      `IG: ${joinField(body.instagram)}`,
      `Occupation: ${joinField(body.occupation)}`,
      ``,
      `Photos & video: ${folderLink || "—"}`,
    ].join("\n");
    await sendTelegram(summary);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "submit_failed", message: String(err && err.message ? err.message : err) });
  }
};
