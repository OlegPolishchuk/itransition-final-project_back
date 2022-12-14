import {User} from "../../models/User";
import {faker} from "@faker-js/faker";
import {userRoles} from "../../shared";
import {Locales} from "../../types/Locales";


export const createRandomUser  = (count: number, locale: Locales, status: string, reviewsCount: number) => {
  faker.locale = locale;

  const users: Partial<User>[] = [];

  Array.from({length: count}).forEach(() => {
    const user: Partial<User> = {
      _id: faker.database.mongodbObjectId(),
      userName: faker.name.fullName(),
      login: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      created: new Date(),
      role: userRoles.user,
      status: status,
      reviewsCount,
      lastLogin: new Date(),
    }

    users.push(user);
  });

  return users;
}