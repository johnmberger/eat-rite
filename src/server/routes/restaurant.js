const express = require('express');
const router = express.Router();
const oneRestaurantController = require('../controllers/restaurant');
const knex = require('../db/knex');

router.get('/:id', (req, res, next) => {
  const searchID = req.params.id;
  oneRestaurantController.oneRest(searchID)
  .then((renderObject) => {
    if (req.session.user) renderObject.userName = req.session.user.first_name;
    if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
    res.render('restaurants/one-restaurant', renderObject);
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/edit-restaurant', (req, res, next) => {
  if (req.session.user.is_admin) {
    const searchID = req.params.id;
    const renderObject = {};
    if (req.session.user) renderObject.userName = req.session.user.first_name;
    if (req.session.user) renderObject.is_admin = req.session.user.is_admin;
    knex('restaurants').where('id', searchID).then(rests => {
      let promises = rests.map(rest => {
        return knex('addresses')
        .where({ id: rest.id }).first();
      });
      return Promise.all(promises)
      .then((addresses) => {
        addresses.forEach((address, i) => {
          rests.address = address;
        });
        renderObject.rest = rests;
      });
    })
    .then(() => {
      res.render('restaurants/edit-restaurant', renderObject);
    });
  } else {
    res.status(550).json({error: 'You do not have permission to do that.'});
  }
});

router.put('/:id/edit-restaurant', oneRestaurantController.restUpdate);

router.delete('/:id/delete', (req, res, next) => {
  if (req.session.user.is_admin) {
    const searchID = parseInt(req.params.id);
    oneRestaurantController.oneRestDelete(searchID)
    .then(() => {
      res.send('success!');
    })
    .catch((err) => {
      return next(err);
    });
  } else {
    res.status(550).json({error: 'You do not have permission to do that.'});
  }
});

module.exports = router;
