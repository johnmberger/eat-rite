const knex = require('../db/knex');

function oneRest(searchID) {
  return Promise.all([
    knex('restaurants').where('id', searchID),
    knex('reviews').select('*', 'reviews.created_at as review_date').where('restaurant_id', searchID)
    .leftJoin('users', 'users.id', 'reviews.user_id')
  ])
  .then((result) => {
    var reviews = result[1];
    console.log(reviews);
    var total = 0;
    reviews.forEach(review => {
      total += Number(review.rating);
      console.log(review);
    });
    var average = total / reviews.length;
    var renderObject = {};
    renderObject.numberReviews = reviews.length;
    renderObject.allReviews = reviews;
    renderObject.title = result[0][0].name;
    renderObject.rests = result[0];
    renderObject.score = average;
    return renderObject;
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  oneRest
};
