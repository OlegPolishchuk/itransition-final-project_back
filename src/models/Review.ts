import {model, Schema} from "mongoose";
import { Review } from "../types";

const reviewSchema = new Schema<Review>({
  title: {type: String, required: true},
  subtitle: {type: String, required: true},
  tags: [{type: String, required: true}],
  body: {type: String, required: true},
  personalScore: {type: Number, required: true},
  overallScore: {type: Number, required: true},
  created: {type: Date, required: true},
  updated: {type: Date, required: true},
  userId: {type: String, required: true},
  userName: {type: String, required: true},
  userAvatar: {type: String},
  likes: {type: Number, required: true},
  likesId: [{type: String, required: true}],
  overallScoresId: [{type: String, required: true}]
})

export const Reviews = model<Review>('Reviews', reviewSchema);