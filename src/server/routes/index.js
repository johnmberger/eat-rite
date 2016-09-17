const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  const renderObject = {};
  knex('restaurants')
  .select('*', 'restaurants.id as restaurant_id').join('addresses', 'addresses.id', 'restaurants.address_id')
  .then((restaurants) => {
    const randNum = Math.ceil(Math.random() * (restaurants.length - 3));
    if (req.session.user) renderObject.userName = req.session.user.first_name;
    if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
    renderObject.title = 'Eat Rite  | You Betta\' Eat Rite!';
    renderObject.restaurants = restaurants.slice(randNum, randNum + 3);
    res.render('index', renderObject);
  });
});

module.exports = router;
