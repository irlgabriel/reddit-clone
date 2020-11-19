var express = require("express");
var router = express.Router();
var Post = require("../models/posts");
var Subreddit = require("../models/subreddits");

const getSubredditId = (name) => {
  Subreddit.findOne({name: name}, (err, sub) => {
    if(err) return err;
    return sub._id;
  })
}

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
    subreddit: getSubredditId(subreddit),
    user: user._id, // object!
    content: content,
  })
    .then((post) => res.status(200).send({message: "Post created!", post: post}))
    .catch(err => res.status(400).send(err));
});

// POST - upvote a post
router.post("/:post_id/upvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;
  Post.findById(post_id, (err, post) => {
    if(err) res.status(400).send(err);
    res.status(200).send(post.upvotePost(user_id));
  })
})

// POST - downvote a post
router.post("/:post_id/downvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;
  Post.findById(post_id, (err, post) => {
    if(err) res.status(400).send(err);
    res.status(200).send(post.upvotePost(user_id));
  })
})

// PUT - Edit a post 
router.put("/:post_id", (req, res, next) => {
  // send an user_id as well just to make sure it's the user that submits the edit req
  const user_id = req.body.user_id;

  const updated_obj = {
    
  }
  Object.keys(req.body).forEach(obj => {
    if(obj !== 'user_id') {
      updated_obj[obj] = req.body[obj];
    }
  })
  // res.status(200).send(updated_obj)
  Post.findByIdAndUpdate(req.params.post_id, updated_obj, {new: true}, (err, doc) => {
    // Check if user that submited the request is the creator
    if(doc.user !== user_id) res.status(403).send({message: "Forbidden"})
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Post edited!", doc});
  })
})

// POST - deletes a post
router.delete("/:post_id", (req, res, next) => {
  const postId = req.params.post_id;
  // Find and delete the post form the "posts" collection
  Post.findByIdAndDelete(postId)
    .then((post) => res.status(200).send({message: "Post deleted!", post}))
    .catch((err) => res.status(400).send(err));
});
module.exports = router;

