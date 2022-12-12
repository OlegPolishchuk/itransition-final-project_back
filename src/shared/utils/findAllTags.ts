import {Groups} from "../../models/Groups";

export const findAllTags = async () => {
  const tagsCollections = await Groups.find()

  return tagsCollections[0].groups;
}