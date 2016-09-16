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
  addRestPage,
  addRest
};
