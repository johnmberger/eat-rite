const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', (req, res, next) => {
  const renderObj = {};
  renderObj.title = 'Review Page';
  res.render('review', renderObj);
});

router.get('/:id', (req, res, next) => {
  const renderObj = {};
  renderObj.title = 'Review Page';
  res.render('review', renderObj);
});

module.exports = router;
