import {Reviews} from "../../models";

export const getUserLikes = async (userId: string) => {
  const reviews = await Reviews.find({userId});

  return reviews.reduce((acc, elem) => {
    return acc + elem.likes;
  }, 0)

}