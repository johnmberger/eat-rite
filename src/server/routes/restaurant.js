const express = require('express');
const router = express.Router();
const oneRestaurantController = require('../controllers/restaurant');
const knex = require('../db/knex');

router.get('/:id', (req, res, next) => {
  const searchID = req.params.id;
  const reviews = [];
  oneRestaurantController.oneRest(searchID)
  .then((renderObject) => {
    res.render('restaurants/one-restaurant', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.delete('/:id/delete', (req, res, next) => {
  const searchID = parseInt(req.params.id);
  oneRestaurantController.oneRestDelete(searchID)
  .then((renderObject) => {
    res.send('success!');
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
