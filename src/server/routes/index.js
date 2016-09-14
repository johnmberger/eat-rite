const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {

  knex('restaurants').select('*')
  .then((restaurants) => {
    res.render('index', {
      title: 'Welcome to our site!',
      restaurants
    });
  });
});

module.exports = router;
