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
    //console.log(results);
    switch (results) {
      case 'No user':
        res.json({error: 'Incorrect Password/Email'});
        break;
      default:
        req.session.user = { username: results[0].email, first_name: results[0].first_name, is_admin: results[0].is_admin };
        res.json({ message: 'Login successful.' });
        break;
    }
  });
});

module.exports = router;
