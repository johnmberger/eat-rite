const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

function getUsers() {return knex('users');}

router.get('/', function (req, res, next) {
  res.render('signIn', {title: 'User Sign In'});
});

router.post('/', (req, res, next) => {
  res.render('index', {title: 'SPLASH PAGE'});
});

module.exports = router;
