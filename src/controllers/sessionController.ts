import {Response, Request} from 'express';
import {getGoogleOAuthTokens, GoogleTokensResult} from "../services/user.service";

export const sessionController = async (req: Request, res: Response) => {

  try{
    // get the code from qs
    console.log('sessionController')
    const code = req.query.code as string;


    const {id_token, access_token} = await getGoogleOAuthTokens(code) as GoogleTokensResult;
    console.log({id_token, access_token})
    //get id and access token with the code

    //get user with tokens

    //upsert user


    // create a session

    // create access and refresh tokens

    // set cookies

    //redirect back to client

  } catch (e) {

  }

}