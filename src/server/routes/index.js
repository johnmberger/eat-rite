const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {

  knex('restaurants')
  .select('*', 'restaurants.id as restaurant_id').join('addresses', 'addresses.id', 'restaurants.address_id')
  .then((restaurants) => {
    const randNum = Math.ceil(Math.random() * (restaurants.length - 3));

    var userName;

    if (req.session.user) {
      userName = req.session.user.first_name;
    } else {
      userName = false;
    }

    res.render('index', {
      title: 'Eat Rite  | You Betta\' Eat Rite!',
      restaurants: restaurants.slice(randNum, randNum + 3),
      userName
    });
  });
});

module.exports = router;
