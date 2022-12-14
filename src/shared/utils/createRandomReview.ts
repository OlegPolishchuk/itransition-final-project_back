import {Locales} from "../../types/Locales";
import {faker} from "@faker-js/faker";
import {Review} from "../../models/Review";
import {reviewScore} from "../../shared";

export const createRandomReview = (count: number, locale: Locales, userId: string, tags: string[]) => {
  faker.locale = locale;

  const reviews: Partial<Review>[] = [];

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
      userId,
      title: faker.random.word(),
      subtitle: faker.random.word(),
      tags: [tags[randomDigit]],
      body: faker.lorem.paragraphs(numberOfParagraphs),
      personalScore: faker.datatype.number({max: reviewScore.personal.max}),
      overallScore: faker.datatype.number({max: reviewScore.overall.max}),
      created: new Date(),
      updated: new Date(),
    }

    reviews.push(review);
  })

  return reviews
}