const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signIn');
const doesUserExist = signInController.doesUserExist;

router.get('/', function (req, res, next) {
  res.render('signIn', {title: 'User Sign In'});
});

router.post('/', (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
