import {Schema, model, Types} from "mongoose";

export type User = {
  login: string;
  password: string;
  userName: string;
  reviews: [];
  role: string;
  token: string;
  refreshToken: string;
  status: string;
  avatar: string;
  lastLogin: Date;
  created: Date;
  _doc: object;
  _id?: string;
}


const userSchema = new Schema<User>({
  login: { type: String, required: true, unique: true },
  password: { type: String },
  userName: {type: String},
  token: {type: String},
  avatar: {type: String},
  refreshToken: {type: String},
  reviews: [{type: Types.ObjectId, ref: 'Reviews'}],
  role: { type: String,required: true },
  status: {type: String, required: true},
  created: {type: Date, required: true},
  lastLogin: {type: Date, required: true},
})

export const User = model<User>('User', userSchema);