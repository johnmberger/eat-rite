<<<<<<< HEAD
const db  = require('../db/knex');

function allRests(req, res, next) {
  const renderObject = {};
  db('restaurants').then(rests => {
    let promises = rests.map(rest => {
      return db('addresses')
      .where({ id: rest.id }).first();
    });
    return Promise.all(promises)
    .then((addresses) => {
      addresses.forEach((address, i) => {
        rests[i].address = address;
      });
      renderObject.rests = rests;
    });
  })
  .then(() => {
    res.render('restaurants/restaurants', renderObject);
=======
const knex  = require('../db/knex');
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

function allRests(req, res, next) {
  knex('restaurants').select()
  .then((results) => {
    // console.log(results);
    const renderObject = {};
    renderObject.title = 'All restaurants';
    renderObject.rests = results;
    res.render('restaurants/restaurants', renderObject);
  })
  .catch((err) => {
    return next(err);
>>>>>>> dccfaaed8a2946a1f949dd4ee8ebfaa73e220637
  });
}

function addRestPage(req, res, next) {
  res.render('restaurants/add-restaurant');
}

function addRest(req, res, next) {
  let restInfo = {
    name: req.body.name,
    cuisine_type: req.body.cuisine_type,
    description: req.body.description
  };
  if (restInfo.name && restInfo.cuisine_type && restInfo.description) {
    db('restaurants').insert({
      name: restInfo.name,
      cuisine_type: restInfo.cuisine_type,
      description: restInfo.description
    })
    .then(() => {
      console.log('Restaurant added');
      res.redirect('restaurants');
    });
    // console.log('rests', Rests);
  } else {
    console.log('One or more  text fields are empty');
    res.redirect('add-restaurant');
  }
}

module.exports = {
  allRests,
<<<<<<< HEAD
  addRestPage,
  addRest
=======
  addRestPage
>>>>>>> dccfaaed8a2946a1f949dd4ee8ebfaa73e220637
};
