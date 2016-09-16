const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');

router.post('/add-restaurant', (req, res, next) => {
  console.log(req);
  let newRest = {
    name: req.body.restName,
    cuisine_type: req.body.cuisine_type,
    description: req.body.description
  };
  let newRestAdd = {
    line_1: req.body.line1,
    line_2: req.body.line2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  };
  knex('addresses')
  .insert(newRest)
  .returning('id')
  .into('newRest')
  .as('address_id')
  .then (() => {
    // newRest.address_id = id;

    console.log('test ' + newRest);
    knex('restaurants')
    .insert(newRest)
    .then (() => {
      res.redirect(`/`);
    });
  });
});

module.exports = router;
