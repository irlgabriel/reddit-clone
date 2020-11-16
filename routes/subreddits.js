var express = require("express");
var router = express.Router();
var Subreddit = require("../models/subreddits");

/* GET - retrieve all subreddits */
router.get("/", (req, res, next) => {
  Subreddit.find((err, docs) => {
    if (err) res.status(400).send(err);
    res.status(200).send(docs);
  });
});

/* GET - retrieve subreddit by subreddit_id */
router.get('/:subreddit_name', (req, res, next) => {
  Subreddit.find({name: req.params.subreddit_name}, (err, subreddit) => {
    if(err) res.status(400).send(err)
    res.status(200).send(subreddit);
  })
})

/* POST - create new subreddit */
router.post("/", (req, res, next) => {
  Subreddit.create({
    name: req.body.name,
    creator: req.body.creator,
    posts: [],
  })
    .then((sub) => res.status(200).send(sub))
    .catch((err) => res.status(400).send(err));
});
/* POST - subscribe to subreddit */
router.post("/:subreddit_id/subscribe", (req, res, next) => {
  const user = req.body.user_id
  if(!user) return;
  Subreddit.findById(req.params.subreddit_id, (err, sub) => {
    if(err) res.status(400).send(err);
    sub.members.push(user);
    sub.save((err, sub) => {
      if(err) res.status(400).send(err);
      res.status(200).send({message: `Subscribed to r/${sub.name}`, sub});
    })
  })
})
/* POST - Unsubscribe from subreddit */
router.post("/:subreddit_id/unsubscribe", (req, res, next) => {
  const user = req.body.user_id
  if(!user) return;
  Subreddit.findById(req.params.subreddit_id, (err, sub) => {
    if(err) res.status(400).send(err);
    sub.members = sub.members.filter(member_id => member_id !== user);
    sub.save((err, sub) => {
      if(err) res.status(400).send(err);
      res.status(200).send({message: `Unsubscribed from r/${sub.name}`, sub});
    })
  })
})
module.exports = router;

