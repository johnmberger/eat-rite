const db  = require('../db/knex');
const Rests = db('restaurants');

function allRests(req, res, next) {
  //get books from db
  Rests.select()
  .then((results) => {
    const renderObject = {};
    renderObject.title = 'the ol boopty bop';
    renderObject.rests = results;
    res.render('restaurants/restaurants', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
}

function oneRest(req, res, next) {
  let id = req.params.id;
  Rests.where('id', id)
  .then((result) => {
    const renderObject = {};
    renderObject.rests = result;
    if (result) {
      res.status(200).render('restaurants/one-restaurant', renderObject);
    } else {
      res.status(404).send({message: 'Restaurant not found.'});
    }
  });
}

function addRestPage(req, res, next) {
  res.render('restaurants/add-restaurant');
}

module.exports = {
  allRests,
  oneRest,
  addRestPage
};
