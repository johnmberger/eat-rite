const express = require('express');
const router = express.Router();
const logIn = require('../controllers/signIn');

router.get('/', function (req, res, next) {
  res.render('signIn', {title: 'User Sign In'});
});

router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  logIn(email, password, (err, results) => {
    switch (results) {
      case 'No user':
        res.send('Email Not found!');
        break;
      case false:
        res.json({error: 'Incorrect Password/Email'});
        break;
      default:
        req.session.user = { username: results[0].email, is_admin: results[0].is_admin };
        console.log(req.session);
        break;
    }
  });
});

module.exports = router;
