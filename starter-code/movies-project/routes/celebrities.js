const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

/* render celelbrity list page. */
router.get('/', (req, res, next) => {
  Celebrity.find({}, (err, celebritiesArray) => {
    if (err) {
      return next(err);
    }

    res.render('celebrities/index', {
      title: 'Celebrity Inventory',
      celebrities: celebritiesArray
    });
  });
});

module.exports = router;
