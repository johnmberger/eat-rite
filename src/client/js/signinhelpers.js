const express = require('express');
const router = express.Router();
const knex = require('../../server/db/knex');

const md5 = require('md5');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0/\/', salt);

function passwordValidation (req, res, next) {
  const userEmail = req.body.email;
  knex('users')
  .where('email', userEmail)
  .then ((user) => {
    // const renderObject = {};
    if (user.length) {
      const renderObject = {};
      renderObject.alertIsUser = 'You already have an account set up with that email.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (req.body.password !==  req.body.confirm_password) {
      const renderObject = {};
      renderObject.alertMessage = 'Your passwords do not match.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (userEmail === undefined) {
      const renderObject = {};
      renderObject.alertNoEmail = 'You did not type in an email.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else {
      console.log('match');
    }
    next();
  });
}

//hashing salt
function hashSalt (password) {
  var hashed = bcrypt.hashSync(password, 2);
  return (hashed);
}
//create a user inside the datebase
function createUser(req, userObject) {
  var pass = hashSalt(req.password);
  var newUser = {
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email,
    password: `${pass}`,
    is_admin: req.is_admin || false
  };
  return knex('users').insert(newUser);
}

module.exports = {
  passwordValidation,
  hashSalt,
  createUser
};
