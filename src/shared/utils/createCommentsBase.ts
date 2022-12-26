import {Comments} from "../../models";

export const createCommentsBase = async (reviewId: string) => {

  const comments = new Comments({
    comments: [],
    reviewId,
  })

  await comments.save()

}