const knex  = require('../db/knex');
const bcrypt = require('bcrypt');

function logIn(email, password, cb) {
  knex('users')
  .where('email', email)
  .then((user) => {
    if (user.length) {
      // if (bcrypt.compareSynch(password, user.password)) {
      cb(null, user);
      // } else {
      //   return false;
      // }
    } else {
      cb(null, 'No user');
    }
  }).catch((err) => {
    cb(err);
  });
}

module.exports = logIn;
