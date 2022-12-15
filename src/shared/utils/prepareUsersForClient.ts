import {UserType} from "../../types";

export const prepareUsersForClient = (users: UserType[]) => {
  const result: Partial<UserType>[] = [];

  users.forEach(user => {
    const copy: Partial<UserType> = {...user._doc};

    delete copy.password;
    delete copy.refreshToken;

    result.push(copy)
  })

  return result;
}