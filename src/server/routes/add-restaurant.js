const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');

router.post('/add-restaurant', (req, res, next) => {
  let newRest = {
    name: req.body.restName,
    cuisine_type: req.body.cuisine_type,
    description: req.body.description
  };
  console.log(newRest);
  knex('restaurants')
  .insert(newRest)
  .then (() => {
    res.redirect(`/`);
  });
});

module.exports = router;
