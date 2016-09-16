const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0/\/', salt);

function passwordValidation (req, res, next) {
  const userEmail = req.body.email;
  knex('users')
  .where('email', userEmail)
  .then ((user) => {
    const renderObject = {};
    if (user.length) {
      renderObject.alertIsUser = 'You already have an account set up with that email.';
      res.render('newUser', renderObject);
    } else if (req.body.password !==  req.body.confirm_password) {
      renderObject.alertMessage = 'Your passwords do not match.';
      res.render('newUser', renderObject);
    } else if (userEmail === undefined) {
      renderObject.alertNoEmail = 'You did not type in an email.';
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
  console.log('hashed one', hashed);
  return (hashed);
}
//create a user inside the datebase
function createUser(req, userObject) {
  console.log('in the createUser FUNCTION req', req);
  console.log('in the createUser FUNCTION for email', req.password);
  var pass = hashSalt(req.password);
  console.log('PASSSSSSSS', pass);
  console.log('PASS VARIABLE', `${pass}`);

  var newUser = {
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email,
    password: `${pass}`,
    is_admin: req.is_admin || false
  };
  console.log('newusers.......', newUser);
  return knex('users').insert(newUser);
}

module.exports = {
  passwordValidation,
  hashSalt,
  createUser
};
