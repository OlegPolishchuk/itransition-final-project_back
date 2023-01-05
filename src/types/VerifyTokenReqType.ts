import {Request} from "express";
import {DecodedJWT} from "./DecodedJWT";

export interface VerifyTokenReqType extends Request {
  user: DecodedJWT | string
}
