const { google } = require("googleapis");

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN });
  return client;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { name } = req.body || {};
    const auth = getOAuthClient();
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
