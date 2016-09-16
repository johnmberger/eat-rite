const knex = require('../db/knex');

function oneRest(searchID) {
  return Promise.all([
    knex('restaurants').where('restaurants.id', searchID)
    .leftJoin('employees', 'employees.restaurant_id', 'restaurants.id')
    .orderBy('employees.role', 'DESC'),
    knex('reviews').select('*', 'reviews.created_at as review_date').where('restaurant_id', searchID)
    .leftJoin('users', 'users.id', 'reviews.user_id')
  ])
  .then((result) => {
    console.log(result);
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
    console.log(err);
  });
}

module.exports = {
  oneRest
};
