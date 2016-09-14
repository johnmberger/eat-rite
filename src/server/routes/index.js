const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {

  knex('restaurants').select('*').join('addresses', 'addresses.id', 'restaurants.address_id')
  .then((restaurants) => {
    const randNum = Math.ceil(Math.random() * restaurants.length);
    res.render('index', {
      title: 'You Betta\' Eat Rite!',
      restaurants: restaurants.slice(randNum, randNum + 3)
    });
  });
});

module.exports = router;
