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

  Post.findById(req.params.id, (err, post) => {
    if(err) res.status(400).send(err)
    // First check if the user maybe downvoted this first and remove the downvote
    if(post.downvotes.includes(userId)) post.update({$pull: {downvotes: userId}});

    // Then we check if the user previously upvoted it and instead remove it
    if(post.upvotes.includes(userId)) {
      post.update({$pull: {upvotes: userId}})
    } else {
      post.update({$push: {upvotes: userId}})
    }
    res.status(200).send(post);
  })
})
// POST - downvote a post
router.post("/downvote/:id", (req, res, next) => {
  const userId = req.body.user_id;
  
  Post.findById(req.params.id, (err, post) => {
    if(err) res.status(400).send(err)
    // Check if the user upovted this before
    if(post.upvotes.includes(userId)) post.update({$pull: {upvotes: userId}});

    // Now check if the user previously downvoted it and remove it if that is the case
    if(post.downvotes.includes(userId)) {
      post.update({$pull: {downvotes: userId}})
    } else {
      post.update({$push: {downvotes: userId}})
    }
    res.sendStatus(200);
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
