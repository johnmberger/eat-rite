const express = require('express');
const router = express.Router();
const knex = require('knex');
const db  = require('../db/knex');
const restsController = require('../controllers/restaurants');

router.get('/', restsController.allRests);
router.get('/add-restaurant', restsController.addRestPage);
<<<<<<< HEAD
router.post('/add-restaurant', restsController.addRest);
=======

router.post('/add-restaurant', (req, res, next) => {
  let newRest = {
    name: req.body.restName,
    cuisine_type: req.body.cuisine_type,
    description: req.body.description,
    // address_id: 1
  };
  // let newAddress = {
  //
  // }
  console.log(newRest);
  db('restaurants')
  .insert(newRest)
  .returning('id')
  .then ((id) => {
    res.redirect(`/restaurant/${id}`);
  });
});
>>>>>>> dccfaaed8a2946a1f949dd4ee8ebfaa73e220637

module.exports = router;
