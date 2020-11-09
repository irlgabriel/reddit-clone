var express = require("express");
var router = express.Router();

const Post = require("../models/posts");

router.get("/", (req, res, next) => {
  const postId = req.params.post_id
  Post.findById(postId, (err, post => {
    if(err) res.sendStatus(400);
    res.status(200).send(post.comments)
  }))
})

module.exports = router;