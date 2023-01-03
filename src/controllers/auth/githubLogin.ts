import {Request, Response} from "express";
import {getGithubAccessToken, getGithubUser} from "../../shared";
import {socialLogin} from "./socialLogin";

export const githubLogin =  async (req: Request, res: Response) => {

  try {
    const {code} = req.body;

    const access_token = await getGithubAccessToken(code);
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