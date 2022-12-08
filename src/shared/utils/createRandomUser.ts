import {User} from "../../models/User";
import {faker} from "@faker-js/faker";
import {userRoles, userStatus} from "../../shared";
import {Locales} from "../../types/Locales";

export const createRandomUser  = (count: number, locale: Locales) => {
  faker.locale = locale;

  const users: Partial<User>[] = [];

  Array.from({length: count}).forEach(() => {
    const user: Partial<User> = {
      userName: faker.internet.userName(),
      login: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      created: faker.date.past(),
      role: userRoles.user,
      status: userStatus.active,
      reviews: [],
    }

    users.push(user);
  });

  return users;
}