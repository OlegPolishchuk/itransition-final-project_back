import {model, Schema} from "mongoose";
import { Tag } from "../types";



const groupsSchema = new Schema({
  id: String,
  groups: [{type: String}],
})

groupsSchema.index({groups : 'text'});

export const Tags = model<Tag>('Tags', groupsSchema);