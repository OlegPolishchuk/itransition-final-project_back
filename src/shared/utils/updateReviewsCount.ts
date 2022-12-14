import {User} from "../../models/User";

export const updateReviewsCount = async (usersId: string[], count: number) => {

  try{
    for await (let id of usersId) {
      const user = await User.findOne({_id: usersId});
      let reviewCount = 0;

      if (user) {
        reviewCount = user.reviewsCount;
      }
      const amount = (reviewCount + count) >= 0 ? reviewCount + count : 0;

      await User.updateOne({_id: id}, {$set:{reviewsCount: amount}})
    }
  }
  catch (e) {
    throw e
  }

}