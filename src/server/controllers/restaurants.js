const knex  = require('../db/knex');
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

function allRests(req, res, next) {
  const renderObject = {};
  knex('restaurants').orderBy('name', 'ASC').then(rests => {
    let promises = rests.map(rest => {
      return knex('addresses')
      .where({ id: rest.id }).first();
    });
    return Promise.all(promises)
    .then((addresses) => {
      if (req.session.user) renderObject.userName = req.session.user.first_name;
      if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
      addresses.forEach((address, i) => {
        rests[i].address = address;
      });
      renderObject.title = 'All restaurants!';
      renderObject.rests = rests;
    });
  })
  .then(() => {
    res.render('restaurants/restaurants', renderObject);
  });
}

function addRestPage(req, res, next) {
  const renderObject = {};
  if (req.session.user) renderObject.userName = req.session.user.first_name;
  if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
  res.render('restaurants/add-restaurant', renderObject);
}

function addRest(req, res, next) {
  let newRest = {
    name: req.body.name,
    cuisine_type: req.body.cuisine_type,
    description: req.body.description
  };
  let newRestAdd = {
    line_1: req.body.line1,
    line_2: req.body.line2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  };
  knex('addresses')
  .insert(newRestAdd)
  .returning('id')
  .then ((id) => {
    newRest.address_id = parseInt(id);
    knex('restaurants')
    .insert(newRest)
    .returning('id')
    .then ((id) => {
      res.redirect(`/restaurant/${id}`);
    });
  });
}

module.exports = {
  allRests,
  addRestPage,
  addRest
};
