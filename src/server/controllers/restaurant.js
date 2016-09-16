const knex = require('../db/knex');

function oneRestDelete(searchID) {
  return knex('reviews').where('restaurant_id', searchID).del()
  .then((result) => {
    knex('employees').where('restaurant_id', searchID).del()
    .then((result) => {
      knex('restaurants').where('id', searchID).del()
      .then((data) => {
        return data;
      });
    });
  });
}

function oneRest(searchID) {
  return Promise.all([
    knex('restaurants').where('restaurants.id', searchID)
    .leftJoin('employees', 'employees.restaurant_id', 'restaurants.id'),
    knex('reviews').select('*', 'reviews.created_at as review_date').where('restaurant_id', searchID)
    .leftJoin('users', 'users.id', 'reviews.user_id')
    .orderBy('review_date', 'DESC')
  ])
  .then((result) => {
    var reviews = result[1];
    var total = 0;
    reviews.forEach(review => {
      total += Number(review.rating);
    });
    var average = total / reviews.length;
    var renderObject = {};
    renderObject.numberReviews = reviews.length;
    renderObject.allReviews = reviews;
    renderObject.title = result[0][0].name;
    renderObject.rest = result[0][0];
    renderObject.score = average;
    renderObject.employees = result[0];
    renderObject.id = searchID;
    return renderObject;
  }).catch((err) => {
    return err;
  });
}

module.exports = {
  oneRest,
  oneRestDelete
};
