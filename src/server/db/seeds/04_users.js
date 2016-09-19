const faker = require('faker');

function userSeed(knex) {

  return knex('users').insert({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    is_admin: false
  });
}
exports.seed = function (knex, Promise) {
  const iterationArray = new Array(50);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return userSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
