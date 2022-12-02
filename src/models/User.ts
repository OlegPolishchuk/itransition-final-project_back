import {Schema, model, Types} from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reviews: [{type: Types.ObjectId, ref: 'Reviews'}]
})

export const User = model('User', userSchema);