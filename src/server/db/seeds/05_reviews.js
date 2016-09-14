const faker = require('faker');

function reviewSeed(knex) {

  return knex('reviews').insert({
    content: faker.lorem.sentences(4),
    rating: faker.random.number({
      min: 1,
      max: 5
    }),
    user_id: faker.random.number({
      min: 1,
      max: 50
    }),
    restaurant_id: faker.random.number({
      min: 1,
      max: 50
    })
  });
}
exports.seed = function (knex, Promise) {
  const iterationArray = new Array(500);

  let ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return reviewSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
