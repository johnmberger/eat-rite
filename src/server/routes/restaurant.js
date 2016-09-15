const express = require('express');
const router = express.Router();
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
const oneRestC = require('../controllers/restaurant');

router.get('/:id', (req, res, next) => {
  const searchID = req.params.id;
  const reviews = [];
  oneRestC.oneRest(searchID).then((renderObject) => {
    res.render('restaurants/one-restaurant', renderObject);
  });
});

router.get('/:id/review', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Review Page!';
  res.render('review', renderObject);
});

module.exports = router;
