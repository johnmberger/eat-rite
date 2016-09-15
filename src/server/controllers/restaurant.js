const knex  = require('../db/knex');

function oneRest(searchID) {
  return Promise.all([
    knex('restaurants').where('id', searchID),
    knex('reviews').where('restaurant_id', searchID)
  ])
  .then((result) => {
    const reviews = result[1];
    var total = 0;
    reviews.forEach(review => {
      total += Number(review.rating);
    });
    var average = total / reviews.length;
    const renderObject = {};
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
