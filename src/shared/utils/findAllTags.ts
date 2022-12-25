import {Tags} from "../../models";

export const findAllTags = async () => {
  const tagsCollections = await Tags.find({})

  console.log(tagsCollections)
  return tagsCollections[0].groups;
}