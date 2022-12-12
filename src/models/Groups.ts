import {model, Schema} from "mongoose";

export type Group = {
  id: string;
  groups: string[];
}

const groupsSchema = new Schema({
  id: String,
  groups: [{type: String}],
})

export const Groups = model<Group>('Groups', groupsSchema);