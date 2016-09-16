const knex  = require('../db/knex');
const bcrypt = require('bcryptjs');

function logIn(email, password, cb) {
  knex('users')
  .where('email', email)
  .then((user) => {
    if (user.length) {
      if (bcrypt.compareSync(password, user[0].password)) {
        cb(null, user);
      } else {
        cb(null, 'No user');
      }
    } else {
      cb(null, 'No user');
    }
  }).catch((err) => {
    cb(err);
  });
}

module.exports = logIn;
