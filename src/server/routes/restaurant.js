const express = require('express');
const router = express.Router();
const oneRestC = require('../controllers/restaurant');

router.get('/:id', (req, res, next) => {
  const searchID = req.params.id;
  const reviews = [];
  oneRestC.oneRest(searchID).then((renderObject) => {
    res.render('restaurants/one-restaurant', renderObject);
  });
});

module.exports = router;
