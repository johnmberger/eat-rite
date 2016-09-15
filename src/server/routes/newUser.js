const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const validateFunc = require('../../client/js/main');

router.get('/', function (req, res, next) {
  res.render('newUser', {title: 'New User Page'});
});

router.post('/', (req, res, next) => {
  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin
  };
  knex('users')
  .insert(newUser)
  .then (() => {
    res.redirect('/', {title: 'SPLASH PAGE'});
  });
});

module.exports = router;
