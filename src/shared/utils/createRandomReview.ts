import {Locales} from "../../types/Locales";
import {faker} from "@faker-js/faker";
import {reviewScore} from "../../shared";
import {Review} from "../../types";
import {User} from "../../models";

export const createRandomReview = async (count: number, locale: Locales, userId: string, tags: string[]) => {
  faker.locale = locale;

  const reviews: Partial<Review>[] = [];
  const user = await User.findById(userId);

  const userData = {
    userId,
    userName: user!.userName,
    userAvatar: user!.avatar,
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

    const review: Partial<Review> = {
      title: faker.random.word(),
      subtitle: faker.random.word(),
      tags: [tags[randomDigit]],
      body: `![](${faker.image.image()}) \n\n ${generateParagraphs(numberOfParagraphs)}`,
      personalScore: faker.datatype.number({max: reviewScore.personal.max}),
      overallScore: faker.datatype.number({max: reviewScore.overall.max}),
      likes: faker.datatype.number({max: 150}),
      likesId: [],
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