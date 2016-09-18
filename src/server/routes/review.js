const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');
<<<<<<< HEAD
var userName;
=======
const checkUserFunc = require('../controllers/signuphelpers');
>>>>>>> gina

router.get('/', (req, res, next) => {
  const renderObject = {};
  if (req.session.user) renderObject.userName = req.session.user.first_name;
  if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
  renderObject.title = 'Review Page';
  res.render('review', renderObject);
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('restaurants').where('id', id)
  .then((result) => {
    const renderObject = {
      title: 'Review Page',
      result: result
    };
    if (req.session.user) renderObject.userName = req.session.user.first_name;
    if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
    res.render('review', renderObject);
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

router.post('/:id', checkUserFunc.checkUser, (req, res, next) => {
  console.log('req', req);
  console.log('res', res);
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
