import {model, Schema} from "mongoose";
import {ReviewComments} from "../types";


const commentsSchema = new Schema<ReviewComments>({
  comments: [],
  reviewId: {type: String, required: true}
})

export const Comments = model<ReviewComments>('Comments', commentsSchema);