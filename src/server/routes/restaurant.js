const express = require('express');
const router = express.Router();
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
const oneRestC = require('../controllers/restaurant');

router.get('/:id', (req, res, next) => {
  const searchID = req.params.id;
  const reviews = [];

  oneRestC.oneRest(searchID, (err, result) => {
    if (err) {
      next(err);
    } else {
      console.log(result);
      const renderObj = {};
      renderObj.title = result[0].name;
      renderObj.restaurant = result[0];
      res.render('restaurants/restaurant', renderObj);
    }
  });
});

router.get('/:id/new', (req, res, next) => {
  const renderObj = {};
  renderObj.title = 'Create A New Restaurant!';
  renderObj.states = states;
  res.render('new', renderObj);
});

module.exports = router;
