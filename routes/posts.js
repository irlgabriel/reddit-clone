var express = require("express");
var router = express.Router();
var Post = require("../models/posts");

/* GET - retrieve all posts */
router.get("/", (req, res, next) => {
  Post.find((err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

/* POST - Create a post */
router.post("/", (req, res, next) => {
  const { title, subreddit, user, content } = req.body;
  Post.create({
    title: title,
    subreddit: subreddit,
    user: user._id, // object!
    content: content,
  })
    .then((post) => res.status(200).send(post))
    .catch((err) => res.status(400).send(err));
});
// POST - upvote a post
router.post("/upvote/:id", (req, res, next) => {
  const userId = req.body.user_id;
  Post.findById(req.params.id)
  .then(post => {
    if(post.upvotes.includes(userId)) {
      post.upvotes.filter(upvote => upvote != userId)
    } else {
      post.upvotes = [...post.upvotes, userId]
    }
    post.save((err, doc) => {
      if(err) res.status(400).send(err)
      res.status(200).send("Upvoted successfully")
    })
  })
})
// POST - downvote a post
router.post("/downvote/:id", (req, res, next) => {
  const userId = req.body.user_id;
  Post.findById(req.params.id)
  .then(post => {
    post.downvotes.filter(downvote => downvote !== userId)
    post.save((err, doc) => {
      if(err) res.status(400).send(err)
      res.status(200).send("Downvoted successfully")
    })
  })
})
// POST - deletes a post
router.delete("/:user_id/:post_id", (req, res, next) => {
  const postId = req.params.post_id;
  // Find and delete the post form the "posts" collection
  Post.findOneByIdAndRemove(postId)
    .then((post) => res.status(200).send({ msg: "Post deleted", post }))
    .catch((err) => res.status(400).send(err));
});
module.exports = router;
