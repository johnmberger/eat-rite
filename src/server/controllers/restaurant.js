const knex = require('../db/knex');

function oneRestDelete(searchID) {
  return knex('reviews').where('restaurant_id', searchID).del()
  .then(() => {
    knex('employees').where('restaurant_id', searchID).del()
    .then(() => {
      knex('restaurants').where('id', searchID).del()
      .then(() => {
        return;
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
    var addressID = result[0][0].address_id;
    reviews.forEach(review => {
      total += Number(review.rating);
      review.last_name = review.last_name.split('')[0];
      review.review_date = review.review_date.toDateString();
    });
    var average = total / reviews.length;
    return knex('addresses').where('id', addressID)
    .then((address) => {
      const renderObject = {
        numberReviews: reviews.length,
        allReviews: reviews,
        title: result[0][0].name,
        rest: result[0][0],
        score: average,
        employees: result[0],
        address: address[0],
        id: searchID
      };
      console.log(renderObject);
      return renderObject;
    });
  }).catch((err) => {
    return err;
  });
}

function restUpdate(req, res, next) {
  if (req.session.user.is_admin) {
    var name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    const id = parseInt(req.params.id);
    const updatedName = name;
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
  } else {
    res.status(550).json({error: 'You do not have permission to do that.'});
  }
}

module.exports = {
  oneRest,
  restUpdate,
  oneRestDelete
};
