const express = require('express');
const router = express.Router();
const knex = require('knex');
const db  = require('../db/knex');
const restsController = require('../controllers/restaurants');

router.get('/', restsController.allRests);
router.get('/add-restaurant', restsController.addRestPage);
router.get('/:id', restsController.oneRest);
module.exports = router;
