const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const userFunctions = require('../../client/js/signinhelpers');

router.get('/', function (req, res, next) {
  res.render('newUser', {title: 'New User Page'});
});

router.post('/', userFunctions.passwordValidation, (req, res, next) => {
  console.log('request body in route', req.body);
  userFunctions.createUser(req.body)
  .then (() => {
    res.redirect(' /newuser');
  })
  .catch ((err) => {
    return next(err);
  });
});

module.exports = router;
