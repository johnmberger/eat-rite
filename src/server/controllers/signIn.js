const knex  = require('../db/knex');
const bcrypt = require('bcrypt');

function doesUserExist(email) {
  return knex('users').where('email', email);
}

module.exports = doesUserExist;
