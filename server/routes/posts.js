var express = require('express');
var router = express.Router();
var Post = require("../models/posts");

/* GET - retrieve all posts */
router.get("/", (req, res, next) => {
  Post.find((err,docs) =>{
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  })
})
/* POST - Create a post */
router.post("/", (req, res, next) => {
  const {title, subreddit, user, content} = req.body;
  Post.create({
    title: title,
    subreddit: subreddit,
    user: user,
    content: content,
  })
  .then(() => res.status(200).send('Post created successfully'))
  .catch(err => res.status(400).send(err));
})

module.exports = router;