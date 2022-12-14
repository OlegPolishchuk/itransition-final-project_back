import {model, Schema} from "mongoose";

export type User = {
  login: string;
  password: string;
  userName: string;
  reviewsCount:number;
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
  reviewsCount: {type: Number, required: true},
  role: { type: String,required: true },
  status: {type: String, required: true},
  created: {type: Date, required: true},
  lastLogin: {type: Date, required: true},
})

export const User = model<User>('User', userSchema);