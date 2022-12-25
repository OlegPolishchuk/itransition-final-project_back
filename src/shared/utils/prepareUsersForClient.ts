import {UserType} from "../../types";
import {getUserLikes} from "../../shared";

export const prepareUsersForClient = async (users: UserType[]) => {
  const result: Partial<UserType>[] = [];

  for await (let user of users) {
    const likes = await getUserLikes(user._id as string)

    const copy: Partial<UserType> = {...user._doc, likes};

    delete copy.password;
    delete copy.refreshToken;

    result.push(copy)
  }

  return result;
}