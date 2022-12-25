import {Tags} from "../../models";

export const findAllTags = async () => {
  const tagsCollections = await Tags.find({})

  return tagsCollections[0].groups;
}