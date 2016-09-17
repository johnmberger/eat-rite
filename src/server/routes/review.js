const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');
var userName;

router.get('/', (req, res, next) => {
  const renderObj = {};
  if (req.session.user) {
    userName = req.session.user.first_name;
  } else {
    userName = false;
  }
  renderObj.title = 'Review Page';
  renderObj.userName = userName;
  res.render('review', renderObj);
});
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('restaurants').where('id', id)
  .then((result) => {
    const renderObj = {};
    if (req.session.user) {
      userName = req.session.user.first_name;
    } else {
      userName = false;
    }
    renderObj.userName = userName;
    renderObj.title = 'Review Page';
    renderObj.result = result;
    res.render('review', renderObj);
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
    user_id: req.session.user.user_id
  };
  // console.log(newReview);
  knex('reviews')
  .insert(newReview)
  .then (() => {
    res.redirect(`/restaurant/${id}`);
  });
});
module.exports = router;
