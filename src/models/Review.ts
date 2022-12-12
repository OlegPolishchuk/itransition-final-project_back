import {model, Schema} from "mongoose";


export type Review = {
  userId: string;
  title: string;
  subtitle: string;
  tag: string | string[];
  body: string;
  personalScore: number;
  overallScore: number;
  comments: [];
  created: Date,
  updated: Date,
}

const reviewSchema = new Schema<Review>({
  userId: {type: String, required: true},
  title: {type: String, required: true},
  subtitle: {type: String, required: true},
  tag: {type: String, required: true},
  body: {type: String, required: true},
  personalScore: {type: Number, required: true},
  overallScore: {type: Number, required: true},
  created: {type: Date, required: true},
  updated: {type: Date, required: true},
})

export const Reviews = model<Review>('Reviews', reviewSchema);