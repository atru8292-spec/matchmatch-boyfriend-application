const formidable = require("formidable");
const fs = require("fs");
const { google } = require("googleapis");

// Vercel Node function — we parse the multipart body ourselves.
module.exports.config = { api: { bodyParser: false } };

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
    "https://www.googleapis.com/auth/drive",
  ]);
}

async function uploadFile(drive, folderId, file, name) {
  if (!file) return "";
  const res = await drive.files.create({
    requestBody: { name, parents: [folderId] },
    media: { mimeType: file.mimetype || "application/octet-stream", body: fs.createReadStream(file.filepath) },
    fields: "id, webViewLink",
  });
  return res.data.webViewLink || `https://drive.google.com/file/d/${res.data.id}/view`;
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const form = formidable({ multiples: true, maxFileSize: 250 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const flat = {};
    for (const [key, value] of Object.entries(fields)) {
      const isMulti = key === "love_language_give" || key === "love_language_receive" || key === "values";
      flat[key] = Array.isArray(value) && value.length === 1 && !isMulti ? value[0] : value;
    }

    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const drive = google.drive({ version: "v3", auth });

    // 1. Create a per-applicant Drive subfolder for the photos/video
    const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const applicantName = joinField(flat.full_name) || "Unnamed";
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folderRes = await drive.files.create({
      requestBody: {
        name: `${applicantName} — ${stamp}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
      fields: "id, webViewLink",
    });
    const folderId = folderRes.data.id;
    const folderLink = folderRes.data.webViewLink;

    const portraitFile = files.portrait_photo?.[0] || files.portrait_photo;
    const fulllengthFile = files.fulllength_photo?.[0] || files.fulllength_photo;
    const videoFile = files.intro_video?.[0] || files.intro_video;

    const [portraitLink, fulllengthLink, videoLink] = await Promise.all([
      uploadFile(drive, folderId, portraitFile, "portrait.jpg"),
      uploadFile(drive, folderId, fulllengthFile, "fulllength.jpg"),
      uploadFile(drive, folderId, videoFile, "intro_video.mp4"),
    ]);

    // 2. Append a row to the Google Sheet
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const row = [
      new Date().toISOString(),
      ...TEXT_FIELDS.map(([key]) => joinField(flat[key])),
      portraitLink,
      fulllengthLink,
      videoLink,
      folderLink,
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Responses!A:A",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    // 3. Notify Telegram
    const summary = [
      `<b>New boyfriend application</b>`,
      `${applicantName} · ${joinField(flat.age)} y/o · ${joinField(flat.city)}`,
      `IG: ${joinField(flat.instagram)}`,
      `Occupation: ${joinField(flat.occupation)}`,
      ``,
      `Photos & video: ${folderLink}`,
    ].join("\n");
    await sendTelegram(summary);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "submit_failed", message: String(err && err.message ? err.message : err) });
  }
};
