const express = require('express');
const router = express.Router();
const knex = require('knex');
const db  = require('../db/knex');
const restsController = require('../controllers/restaurants');

router.get('/', restsController.allRests);
router.get('/add-restaurant', restsController.addRestPage);

router.post('/add-restaurant', (req, res, next) => {
  let newRest = {
    name: req.body.name,
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
  db('addresses')
  .insert(newRestAdd)
  .returning('id')
  .then ((id) => {
    newRest.address_id = parseInt(id);
    db('restaurants')
    .insert(newRest)
    .returning('id')
    .then ((id) => {
      res.redirect(`/restaurant/${id}`);
    });
  });
});

module.exports = router;
