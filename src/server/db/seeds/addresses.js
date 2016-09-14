const faker = require('faker');

function addressPromise(knex) {
  return knex('addresses').insert({
    line_1: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode().split('-')[0]
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(50);

  let ArrayOfPromises = Array.from(iterationArray).map(() => {
    return addressPromise(knex);
  });

  return Promise.all(ArrayOfPromises);
}
