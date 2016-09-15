const db  = require('../db/knex');
const Rests = db('restaurants');
const reviews = db('reviews');

function allRests(req, res, next) {
  //get books from db
  Rests.select()
  .then((results) => {
    const renderObject = {};
    renderObject.title = 'All restaurants';
    renderObject.rests = results;
    res.render('restaurants/restaurants', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
}

function oneRest(req, res, next) {
  let id = req.params.id;
  Promise.all([Rests.where('id', id), reviews.where('restaurant_id', id)])
  .then((result) => {
    const reviews = result[1];
    var total = null;
    reviews.forEach(review => {
      total += Number(review.rating);
    });
    var average = total / reviews.length;
    const renderObject = {};
    renderObject.title = result[0][0].name;
    renderObject.rests = result[0];
    renderObject.score = average;
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
  oneRest,
  addRestPage
};
