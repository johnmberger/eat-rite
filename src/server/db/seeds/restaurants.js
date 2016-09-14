const faker = require('faker');

const cuisines = [
  'American',
  'Thai',
  'Italian',
  'Carribean',
  'Indian',
  'French',
  'Mexican'
];

function restaurantPromise(knex, id) {
  return knex('restaurants').insert({
    name: `${faker.name.firstName()}'s`,
    cuisine_type: faker.random.number(cuisines.length - 1),
    description: faker.lorem.paragraph(),
    address_id: id
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(50);

  let ArrayOfPromises = Array.from(iterationArray).map((item, i) => {
    let id = i + 1;
    return restaurantPromise(knex, id);
  });

  return Promise.all(ArrayOfPromises);
}
