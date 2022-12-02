import axios from "axios";
import qs from 'querystring';
import dotenv from 'dotenv';

dotenv.config();


export interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}


export const getGoogleOAuthTokens = async (code: string) => {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  try {
    const res = await axios.post<GoogleTokensResult>(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-from-urlencoded',
      }
    })

    return res.data;

  } catch (e) {
    console.log(e, 'Failed to fetch Google Oauth Tokens')
  }
}