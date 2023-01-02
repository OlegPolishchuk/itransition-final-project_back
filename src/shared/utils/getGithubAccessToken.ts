import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Client_id = process.env.GITHUB_CLIENT_ID as string;
const Client_secret = process.env.GITHUB_CLIENT_SECRET as string;

export const getGithubAccessToken = async (code: string) => {
  const params = `?client_id=${Client_id}&client_secret=${Client_secret}&code=${code}`;

  const res = await axios.post('https://github.com/login/oauth/access_token' + params)

  return  res.data.split('&')[0].split('=')[1];
}