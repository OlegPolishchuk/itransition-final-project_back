import {Locales} from "../../types/Locales";
import {faker} from "@faker-js/faker";
import {groups, reviewScore} from "../../shared";
import {Review} from "../../types";
import {User} from "../../models";

export const createRandomReview = async (count: number, locale: Locales, userId: string, tags: string[], group?: string) => {
  faker.locale = locale;
  console.log('group', group)
  const reviews: Partial<Review>[] = [];
  const user = await User.findById(userId);

  const userData = {
    userId,
    userName: user!.userName,
    userAvatar: user!.avatar,
    userLikes: user!.likes,
  }

  Array.from({length: count}).forEach(() => {
    const randomDigit = faker.datatype.number({
      min: 0,
      max: tags.length - 1
    })

    const numberOfParagraphs = faker.datatype.number({
      min: 5,
      max: 30,
    })

    const randomGroupsIndex = faker.datatype.number({
      max: groups.length - 1
    })

    const review: Partial<Review> = {
      title: faker.random.word(),
      subtitle: faker.random.word(),
      group: group ? group : groups[randomGroupsIndex],
      tags: [tags[randomDigit]],
      body: `![](${faker.image.image()}) \n\n ${generateParagraphs(numberOfParagraphs)}`,
      personalScore: faker.datatype.number({max: reviewScore.personal.max}),
      overallScore: faker.datatype.number({max: reviewScore.overall.max}),
      likes: 0,
      likesId: [],
      comments: 0,
      overallScoresId: [],
      created: new Date(),
      updated: new Date(),
      ...userData,
    }

    reviews.push(review);
  })

  return reviews
}

function generateParagraphs(numberOfParagraphs: number) {
  let result = '';

  for (let i = 0; i < numberOfParagraphs; i++) {
    result += faker.lorem.paragraphs(1) + '\n\n'
  }

  return result;
}