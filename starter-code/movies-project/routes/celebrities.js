const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

/* render the list page */
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

/* render the detail page */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id, (err, celebrity) => {
    if (err) {
      return next(err);
    }
    if (!celebrity) {
      res.status(404);
      const data = {
        title: '404 Not Found'
      };
      return res.render('not-found', data);
    }
    const data = {
      title: celebrity.name,
      celebrity: celebrity
    };
    res.render('celebrities/detail', data);
  });
});

/* render the create form */
router.get('/new', (req, res, next) => {
  res.render('celebrities/new', {
    title: "Build Your Celebrity's Profile"
  });
});

/* handle the POST from the create form */
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

/* handle the POST to delete one */
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.remove({_id: id}, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/celebrities');
  });
});

module.exports = router;
