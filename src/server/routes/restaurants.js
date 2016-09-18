const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');
const restsController = require('../controllers/restaurants');

router.get('/', restsController.allRests);
router.get('/add-restaurant', restsController.addRestPage);

router.post('/add-restaurant', restsController.addRest);

module.exports = router;
