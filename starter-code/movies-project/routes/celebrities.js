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

router.get('/new', (req, res, next) => {
  res.render('celebrities/new', {
    title: "Build Your Celebrity's Profile"
  });
});

router.post('/', (req, res, next) => {
  const theCelebrity = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  });

  theCelebrity.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/celebrities');
  });
});

module.exports = router;
