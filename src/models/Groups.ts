import {model, Schema} from "mongoose";
import { Group } from "../types";



const groupsSchema = new Schema({
  id: String,
  groups: [{type: String}],
})

export const Groups = model<Group>('Groups', groupsSchema);