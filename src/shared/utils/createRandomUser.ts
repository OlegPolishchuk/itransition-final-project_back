import {User} from "../../models/User";
import {faker} from "@faker-js/faker";
import {userRoles} from "../../shared";
import {Locales} from "../../types/Locales";


export const createRandomUser  = (count: number, locale: Locales, status: string) => {
  faker.locale = locale;

  const users: Partial<User>[] = [];

  Array.from({length: count}).forEach(() => {
    const user: Partial<User> = {
      userName: faker.name.fullName(),
      login: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      created: new Date(),
      role: userRoles.user,
      status: status,
      reviews: [],
      lastLogin: new Date(),
    }

    users.push(user);
  });

  return users;
}