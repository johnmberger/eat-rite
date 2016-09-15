const knex  = require('../db/knex');

function oneRest(id, callback) {
  const searchID = Number(id);
  knex('restaurants').where('restaurants.id', searchID)
  .join('addresses', {'restaurants.address_id': 'addresses.id'})
  .then(restaurant => {
    callback(null, restaurant);
  }).catch(err => {
    callback(err);
  });
}

function getReviews(id, callback) {
  const restaurantID = Number(id);
  knex('reviews').where('restaurant_id', restaurantID)
  .then(reviews => {
    callback(null, reviews);
  }).catch(err => {
    callback(err);
  });
}

module.exports = {
  oneRest,
  getReviews
};
