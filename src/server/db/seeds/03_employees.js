const faker = require('faker');

const roles = [
  'Manager',
  'Employee',
  'Trainee'
];

function employeeSeed(knex) {
  return knex('employees').insert({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    role: roles[faker.random.number(roles.length - 1)],
    restaurant_id: faker.random.number({
      min: 1,
      max: 50
    })
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(100);

  let ArrayOfPromises = Array.from(iterationArray)
  .map((item, i) => {
    return employeeSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
}
