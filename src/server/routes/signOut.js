const express = require('express');
const router = express.Router();
const logIn = require('../controllers/signIn');

router.get('/', (req, res, next) => {
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.json({logOut: 'You have been successfully logged out.'});
});

module.exports = router;
