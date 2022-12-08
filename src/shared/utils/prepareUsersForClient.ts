import {User} from '../../models/User';

export const prepareUsersForClient = (users: User[]) => {
  const result: Partial<User>[] = [];

  users.forEach(user => {
    const copy: Partial<User> = {...user._doc};

    delete copy.password;
    delete copy.refreshToken;

    result.push(copy)
  })

  return result;
}