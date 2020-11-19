var express = require("express");
var router = express.Router();
var Subreddit = require("../models/subreddits");

/* GET - Get subreddit posts */
router.get("/:subreddit_id/posts/", (req, res, next) => {
  Subreddit.findById(req.params.subreddit_id, (err, subreddit) => {
    if(err) res.status(400).send(err);
    res.json(subreddit.getPosts());
  })
})

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
  console.log(req.body);
  Subreddit.create({
    name: req.body.name,
    creator: req.body.creator,
    description: req.body.description,
  })
  .then((sub) => res.status(200).send(sub))
  .catch((err) => console.log(err));
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

/* DELETE - Delete subreddit */
router.delete("/:subreddit_id/", (req, res, next) => {
  Subreddit.findByIdAndDelete(req.params.subreddit_id, (err, doc) => {
    if(err) res.status(400).send(err);
    doc.deleteSubredditPosts();
    res.status(200).send({message: "Subreddit deleted", doc});
  })
})
module.exports = router;

