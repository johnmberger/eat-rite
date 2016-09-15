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

<<<<<<< HEAD
=======
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

>>>>>>> e4aa56ce0756493cf7acf69fa65a8a0cafdfb6c6
module.exports = {
  allRests,
  oneRest,
  addRestPage
};
