const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const userFunctions = require('../../client/js/signinhelpers');

router.get('/', function (req, res, next) {
  res.render('newUser', {title: 'New User Page'});
});

router.post('/', userFunctions.passwordValidation, (req, res, next) => {
  if (!req.body.err) {
    sessionStorage.clear();
    userFunctions.createUser(req.body)
    .then (() => {
      res.redirect('/');
    })
    .catch ((err) => {
      return next(err);
    });
  }
});

module.exports = router;
