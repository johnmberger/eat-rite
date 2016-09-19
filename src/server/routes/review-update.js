const express = require('express');
const router = express.Router();
const knex  = require('../db/knex');
const one_Rest = require('../controllers/restaurant').oneRest;

router.delete('/:id/delete/:id2', (req, res, next) => {
  var revId =  req.params.id;
  var restId = req.params.id2;
  knex('reviews')
  .select('*', 'reviews.created_at as review_date')
  .where('restaurant_id', restId)
  .andWhere('user_id', revId).del().then(() => {
    res.send('success!');
  })
  .catch((err) => {
    return next(err);
  });
});

router.get('/:id/edit-review/:id2', (req, res, next) => {

  var searchID = req.params.id;
  var restId =  req.params.id2;

  knex('reviews')
  .select('*', 'reviews.created_at as review_date')
  .where('restaurant_id', restId)
  .andWhere('user_id', searchID).first()
  .then((result) => {
    const renderObj = {};
    if (req.session.user) renderObj.userName = req.session.user.first_name;
    if (req.session.user) renderObj.is_admin = req.session.user.is_admin;
    renderObj.title = 'Edit Review';
    renderObj.result = result;
    res.render('edit-review', renderObj);
  });
});

router.put('/edit-review', reviewUpdate);
function reviewUpdate(req, res, next) {
  var ids = req.headers.referer.split('/');
  var rev = ids[4];
  var rest = ids[6];
  const update = {
    content: req.body.content,
    rating: parseInt(req.body.rating)
  };
  knex('reviews')
  .select('*', 'reviews.created_at as review_date')
  .where('restaurant_id', rest)
  .andWhere('user_id', rev)
  .update({
    content: req.body.content,
    rating: parseInt(req.body.rating)
  })
  .then((results) => {
    res.status(200).json({
      status: 'success'
    });
  });
}

module.exports = router;
