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

function restUpdate(req, res, next) {
  const id = parseInt(req.params.id);
  const updatedName = req.body.name;
  const updatedCuisine = req.body.rest_cuisine;
  const updatedDescription = req.body.description;
  const updatedStreet = req.body.line_1;
  const updatedCity = req.body.city;
  const updatedState = req.body.state;
  const updatedZip = req.body.zip;
  knex('restaurants')
  .update({
    name: updatedName,
    cuisine_type: updatedCuisine,
    description: updatedDescription
  })
  .where('id', id)
  .returning('*')
  .then((results) => {
    knex('addresses')
    .update({
      line_1: updatedStreet,
      city: updatedCity,
      state: updatedState,
      zip: updatedZip
    })
    .where('id', id)
    .returning('*')
    .then((results) => {
      res.status(200).json({
        status: 'success',
        message: `${results[0].name} has been updated!`
      });
    });
  });
}

module.exports = {
  oneRest,
  restUpdate
};
