import {Request, Response} from "express";
import dotenv from "dotenv";
import {getGithubAccessToken, getGithubUser} from "../../shared";
import {socialLogin} from "./socialLogin";

dotenv.config();

const Client_id = process.env.GITHUB_CLIENT_ID as string;
const Client_secret = process.env.GITHUB_CLIENT_SECRET as string;

export const githubLogin =  async (req: Request, res: Response) => {

  try {
    const {code} = req.body;

    // console.log(code)
    // const params = `?client_id=${Client_id}&client_secret=${Client_secret}&code=${code}`;
    //
    // const res = await axios.post('https://github.com/login/oauth/access_token' + params)
    // const data = res.data;
    //
    // console.log(data)
    const access_token = await getGithubAccessToken(code);
    console.log(access_token)
    const user = await getGithubUser(access_token);

    req.body = {...user};

    return socialLogin(req, res)
  }
  catch (e) {
    res.status(500).json({
      message: 'Error in githubLogin controller',
      e,
    })
  }

}