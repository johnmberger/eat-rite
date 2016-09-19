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

function restaurantSeed(knex, id) {
  return knex('restaurants').insert({
    name: `${faker.commerce.productAdjective()} ${faker.name.firstName()}'s`,
    cuisine_type: cuisines[faker.random.number(cuisines.length - 1)],
    description: faker.lorem.sentences(5),
    address_id: id
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(50);

  var ArrayOfPromises = Array.from(iterationArray)
  .map((item, i) => {
    let id = i + 1;
    return restaurantSeed(knex, id);
  });

  return Promise.all(ArrayOfPromises);
};

module.exports = cuisines;
