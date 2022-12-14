import {Groups} from "../../models/Groups";
import {findAllTags} from "../../shared";

export const addNewTags = async (newTags: string[], allTags?: string[]) => {
  try {
    let result = [];
    let tags = allTags || await findAllTags();


    result = [...tags.concat(newTags)];

    result = Array.from(new Set(result))

    await Groups.updateMany({}, {groups: result})
  }
  catch (e) {
    throw e
  }
}