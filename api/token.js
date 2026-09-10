const { google } = require("googleapis");

// Uses a real Google account (via OAuth refresh token) instead of a service
// account — service accounts have zero storage quota on a personal (non-
// Workspace) Google Drive and can't create files there, even when a folder
// is shared with them as Editor. See:
// https://developers.google.com/workspace/drive/api/guides/handle-errors#resolve_a_403_error_storage_quota_exceeded
function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN });
  return client;
}

module.exports = async (req, res) => {
  try {
    const client = getOAuthClient();
    const { token } = await client.getAccessToken();
    if (!token) throw new Error("no_access_token");
    res.status(200).json({ accessToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "token_failed", message: String(err && err.message ? err.message : err) });
  }
};
