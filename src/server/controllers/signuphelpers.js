const knex = require('../db/knex');
const bcrypt = require('bcryptjs');

function passwordValidation (req, res, next) {
  const userEmail = req.body.email.toLowerCase();
  knex('users')
  .where('email', userEmail)
  .then ((user) => {
    var renderObject = {};
    var str = req.body.password;
    var upper = (/[A-Z]/.test(str));
    var lower = (/[a-z]/.test(str));
    var number = (/[0-9]/.test(str));

    if (user.length) {
      renderObject.alertIsUser = 'You already have an account set up with that email.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (req.body.first_name.length === 0 || req.body.last_name.length === 0 || req.body.email.length === 0 || req.body.password.length === 0 || req.body.confirm_password.length === 0) {
      renderObject.alertShort = 'You have at least one empty field.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (req.body.password.length < 8) {
      renderObject.alertPass = 'Your password needs to be at least 8 characters long.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (req.body.first_name.length > 41 || req.body.last_name.length > 41) {
      renderObject.alertLength = 'Your name is too long. Please use less than 40 characters.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (req.body.password !==  req.body.confirm_password) {
      renderObject.alertMessage = 'Your passwords do not match.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (userEmail === undefined) {
      renderObject.alertNoEmail = 'You did not type in an email.';
      req.body.err = true;
      res.render('newUser', renderObject);
    } else if (upper === false || lower === false || number === false) {
      renderObject.valPass = 'Your password does not meet our requirements.';
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
  return hashed;
}

//create a user inside the datebase
function createUser(req, userObject) {
  var pass = hashSalt(req.password);
  var newUser = {
    first_name: req.first_name,
    last_name: req.last_name,
    email: req.email.toLowerCase(),
    password: `${pass}`,
    is_admin: req.is_admin || false
  };
  return knex('users').insert(newUser);
}

function checkUser(req, res, next) {
  if (!req.session.user) {
    res.render('/signIn', {
      loginError: 'You must be logged in to do that.'
    });
  }
  next();
}

module.exports = {
  passwordValidation,
  createUser,
  hashSalt,
  checkUser
};
