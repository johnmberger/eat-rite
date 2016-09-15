const express = require('express');
const router = express.Router();
const knex = require('knex');
const db  = require('../db/knex');
const restsController = require('../controllers/restaurants');

router.get('/', restsController.allRests);
<<<<<<< HEAD
router.get('/add-restaurant', restsController.addRestPage);
router.get('/:id', restsController.oneRest);
=======
>>>>>>> 17dfbbb75d05c274e82a9a8a18c11601a2300b1f

module.exports = router;
