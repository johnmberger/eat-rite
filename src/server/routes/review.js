const express = require('express');
const router = express.Router();
const db  = require('../db/knex');
const Rests = db('restaurants');

const indexController = require('../controllers/index');

router.get('/', (req, res, next) => {
  const renderObj = {};
  renderObj.title = 'Review Page';
  res.render('review', renderObj);
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Rests.where('id', id)
  .then((result) => {
    const renderObj = {};
    renderObj.title = 'Review Page';
    renderObj.result = result;
    res.render('review', renderObj);
    console.log(renderObj);
  });
});

function oneRest(req, res, next) {
  let id = req.params.id;
  Rests.where('id', id)
  .then((result) => {
    const renderObject = {};
    renderObject.rests = result;
    if (result) {
      res.status(200).render('restaurants/one-restaurant', renderObject);
    } else {
      res.status(404).send({message: 'Restaurant not found.'});
    }
  });
}

module.exports = router;
