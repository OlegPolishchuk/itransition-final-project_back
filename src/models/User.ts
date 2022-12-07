import {Schema, model, Types} from "mongoose";

export type User = {
  login: string;
  password: string;
  reviews: [];
  role: string;
  token: string;
  refreshToken: string;
  status: string;
  _doc: object;
}


const userSchema = new Schema<User>({
  login: { type: String, required: true, unique: true },
  password: { type: String },
  token: {type: String},
  refreshToken: {type: String},
  reviews: [{type: Types.ObjectId, ref: 'Reviews'}],
  role: { type: String,required: true },
  status: {type: "String", required: true},
})

export const User = model<User>('User', userSchema);