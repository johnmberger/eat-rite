const knex  = require('../db/knex');
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

function allRests(req, res, next) {
  knex('restaurants').select()
  .then((results) => {
    console.log(results);
    const renderObject = {};
    renderObject.title = 'All restaurants';
    renderObject.rests = results;
    res.render('restaurants/restaurants', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
}

function addRestPage(req, res, next) {
  res.render('restaurants/add-restaurant');
}

function addRest(req, res, next) {
  if (req.body.name && req.body.cuisine_type && req.body.description && req.body.location) {
    console.log('hello');
    // Rests.insert({
    //   name: req.body.name,
    //   cuisine_type: req.body.cuisine_type,
    //   location: req.body.location,
    //   description: req.body.description})
    // .then(() => {
    //   console.log('Restaurant added');
    //   res.redirect('restaurants');
    // });
  } else {
    console.log('One or more  text fields are empty');
    res.redirect('add-restaurant');
  }
}

module.exports = {
  allRests,
  addRestPage
};
