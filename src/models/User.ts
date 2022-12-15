import {model, Schema} from "mongoose";
import {UserType} from "../types";

const userSchema = new Schema<UserType>({
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

export const User = model<UserType>('User', userSchema);