import {Schema, model, Types} from "mongoose";

export type User = {
  email: string;
  password: string;
  reviews: [];
  role: string;
  token: string;
  refreshToken: string;
  tokenExpire: number;
  _doc: object;
}


const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: {type: String},
  refreshToken: {type: String},
  tokenExpire: {type: Number},
  reviews: [{type: Types.ObjectId, ref: 'Reviews'}],
  role: { type: String,required: true },
})

export const User = model<User>('User', userSchema);