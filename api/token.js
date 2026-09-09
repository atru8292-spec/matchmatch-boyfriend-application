const { google } = require("googleapis");

// Issues a short-lived Google access token (Drive scope) to the browser so
// the browser itself can talk to Google's upload endpoints directly.
// This is Google's own documented pattern for CORS-safe browser uploads
// (see: github.com/googledrive/cors-upload-sample) — the resumable session
// must be initiated by the browser (with its real Origin header) or Google
// won't return CORS headers on the follow-up PUT.
function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  return new google.auth.JWT(email, null, key, [
    "https://www.googleapis.com/auth/drive",
  ]);
}

module.exports = async (req, res) => {
  try {
    const auth = getGoogleAuth();
    await auth.authorize();
    res.status(200).json({
      accessToken: auth.credentials.access_token,
      expiresAt: auth.credentials.expiry_date,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "token_failed", message: String(err && err.message ? err.message : err) });
  }
};
