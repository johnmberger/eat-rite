const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');

router.get('/', (req, res, next) => {
  const renderObj = {};
  renderObj.title = 'Review Page';
  res.render('review', renderObj);
});

<<<<<<< HEAD
router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Review Page!';
  indexController.sum(1, 2, (error, results) => {
    if (error) return next(error);
    if (results) {
      renderObject.sum = results;
      res.render('review', renderObject);
    }
=======
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('restaurants').where('id', id)
  .then((result) => {
    const renderObj = {};
    renderObj.title = 'Review Page';
    renderObj.result = result;
    res.render('review', renderObj);
>>>>>>> dccfaaed8a2946a1f949dd4ee8ebfaa73e220637
  });
});

function oneRest(req, res, next) {
  let id = req.params.id;
  knex('restaurants').where('id', id)
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

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let newReview = {
    restaurant_id: id,
    content: req.body.reviewText,
    rating: req.body.rating,
    user_id: 1
  };
  // console.log(newReview);
  knex('reviews')
  .insert(newReview)
  .then (() => {
    res.redirect(`/restaurant/${id}`);
  });
});
module.exports = router;
