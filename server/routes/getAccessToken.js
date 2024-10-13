import fetch from 'node-fetch';
import dotenv  from 'dotenv';

dotenv.config(); 

// Dropbox app credentials
const DROPBOX_APP_KEY = process.env.DROPBOX_APP_KEY;
const DROPBOX_APP_SECRET = process.env.DROPBOX_APP_SECRET;
const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;
let dropboxAccessToken = ""; // Will store the access token

// Function to get a new access token using the refresh token
async function getAccessToken() {
  const tokenUrl = 'https://api.dropboxapi.com/oauth2/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', DROPBOX_REFRESH_TOKEN);

  const authHeader = 'Basic ' + Buffer.from(`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`).toString('base64');

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error getting access token: ${data.error_description}`);
    }

    // Save the new access token for future requests
    dropboxAccessToken = data.access_token;
    console.log("Access token refreshed successfully!");

    return dropboxAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

export default getAccessToken;
