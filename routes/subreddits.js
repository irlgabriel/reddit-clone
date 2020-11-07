var express = require('express');
var router = express.Router();
var Subreddit = require("../models/subreddits");

/* GET - retrieve all subreddits */
router.get('/', (req, res, next) => {
  Subreddit.find((err, docs) => {
    if(err) res.status(400).send(err);
    res.status(200).send(docs);
  })
})

/* POST - create new subreddit */
router.post('/', (req, res, next) => {
  Subreddit.create({
    name: req.body.name,
    creator : req.body.creator,
    posts: [],
  })
  .then((sub) => res.status(200).send(sub))
  .catch((err) => res.status(400).send(err))
})

module.exports = router;