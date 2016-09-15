const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');

router.post('/add-restaurant', (req, res, next) => {
  let newReview = {
    created_at: req.body.reviewDate,
    content: req.body.reviewText,
    rating: req.body.rating
  };
  // console.log(newReview);
  knex('reviews')
  .insert(newReview)
  .then (() => {
    res.redirect(`/restaurants`);
  });
});

module.exports = router;
