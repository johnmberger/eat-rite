const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {

  knex('restaurants')
  .select('*', 'restaurants.id as restaurant_id').join('addresses', 'addresses.id', 'restaurants.address_id')
  .then((restaurants) => {
    const randNum = Math.ceil(Math.random() * restaurants.length);

    restaurants.forEach((restaurant) => {
      restaurant.url = `./img/${restaurant.cuisine_type}.jpeg`
    });

    res.render('index', {
      title: 'Eat Rite  | You Betta\' Eat Rite!',
      restaurants: restaurants.slice(randNum, randNum + 3)
    });
  });
});

module.exports = router;
