const express = require('express');
const router = express.Router();
const knex = require('../../server/db/knex');

function passwordValidation (req, res, next) {
  const userEmail = req.body.email;
  const renderObject = {};

  knex('users')
  .then (users => {
      var getOne = users.map(user => {
        //console.log(user.email);    //all email in db
        return user.email;
      });
    })
    .then (getOne => {
    console.log(getOne);
    if (req.body.password !== req.body.confirm_password) {
      renderObject.alertMessage = 'Your passwords do not match.';
      res.render('newUser', renderObject);
    } else if (userEmail === userEmail) {
      renderObject.alertIsUser = 'You already have an account with us.';
    } else {
      console.log('match');
      next();
    }
  });
}

module.exports = {
  passwordValidation
};

// Log all cocktails.
//expected output ['Old Fashined', 'Pisco Sour', 'Manhattan']
// knex('cocktails')
// .then(cocktails => {
//   return cocktails.map(function (cocktail) {
//     return cocktail.name
//   })
// })
