import {Tags} from "../../models";
import {findAllTags} from "../../shared";

export const addNewTags = async (newTags: string[], allTags?: string[]) => {
  try {
    let result = [];
    let tags = allTags || await findAllTags();


    result = [...tags.concat(newTags)];

    result = Array.from(new Set(result))

    await Tags.updateMany({}, {groups: result});

    return result;
  }
  catch (e) {
    throw e
  }
}