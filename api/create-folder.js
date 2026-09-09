const { google } = require("googleapis");

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  return new google.auth.JWT(email, null, key, [
    "https://www.googleapis.com/auth/drive",
  ]);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { name } = req.body || {};
    const auth = getGoogleAuth();
    const drive = google.drive({ version: "v3", auth });
    const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folderRes = await drive.files.create({
      requestBody: {
        name: `${name || "Unnamed"} — ${stamp}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
      fields: "id, webViewLink",
    });
    res.status(200).json({ folderId: folderRes.data.id, folderLink: folderRes.data.webViewLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "create_folder_failed", message: String(err && err.message ? err.message : err) });
  }
};
