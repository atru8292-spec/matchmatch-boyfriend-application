const { google } = require("googleapis");

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  return new google.auth.JWT(email, null, key, [
    "https://www.googleapis.com/auth/drive",
  ]);
}

// Returns a Google Drive resumable-upload session URL. The browser then
// PUTs the file bytes straight to Google — the file never passes through
// this (size-limited) serverless function.
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const { folderId, filename, mimeType } = req.body || {};
    if (!folderId || !filename) {
      res.status(400).json({ error: "missing_fields" });
      return;
    }

    const auth = getGoogleAuth();
    await auth.authorize();
    const accessToken = auth.credentials.access_token;

    const initRes = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
          "X-Upload-Content-Type": mimeType || "application/octet-stream",
        },
        body: JSON.stringify({ name: filename, parents: [folderId] }),
      }
    );

    if (!initRes.ok) {
      const text = await initRes.text();
      res.status(502).json({ error: "drive_session_failed", message: text });
      return;
    }

    const uploadUrl = initRes.headers.get("location");
    res.status(200).json({ uploadUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload_url_failed", message: String(err && err.message ? err.message : err) });
  }
};
