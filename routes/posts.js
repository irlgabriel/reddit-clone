var express = require("express");
var router = express.Router();
var Post = require("../models/posts");
var Subreddit = require("../models/subreddits");
const User = require("../models/users");
const Comment = require("../models/comments");

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
router.post("/", async (req, res, next) => {
  const { title, subreddit, user, content } = req.body;
  const subredditObject = await Subreddit.findOne({name: subreddit});

  new Post({
    title: title,
    subreddit: subredditObject._id,
    user: user._id, // object!
    content: content,
  })
    .save()
    .then(async (post) => {
      // add a ref of this to user
      await User.updateOne({_id: post.user}, {$push: { posts: post._id }})
      res.status(200).send({message: "Post created!", post: post})
    })
    .catch(err => console.log(err));

});

// POST - upvote a post
router.post("/:post_id/upvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;

  Post.findById(post_id, (err, post) => {
    if(err) res.status(400).send(err);
    post.upvotePost(user_id);
    res.status(200).send(post);
  })
})

// POST - downvote a post
router.post("/:post_id/downvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;

  Post.findById(post_id, (err, post) => {
    if(err) res.status(400).send(err);
    post.downvotePost(user_id);
    res.status(200).send(post);
  })
})

// PUT - Edit a post 
router.put("/:post_id", (req, res, next) => {
  // send an user_id as well just to make sure it's the user that submits the edit req
  const user_id = req.body.user_id;
  const updated_obj = {};
  Object.keys(req.body).forEach(obj => {
    if(obj !== 'user_id') {
      updated_obj[obj] = req.body[obj];
    }
  })
  Post.findByIdAndUpdate(req.params.post_id, updated_obj, {new: true}, (err, doc) => {
    // Check if user that submited the request is the creator
    if(doc.user !== user_id) res.status(403).send({message: "Forbidden"})
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Post edited!", doc});
  })
})

// DELETE - deletes a post
router.delete("/:post_id", (req, res, next) => {
  const post_id = req.params.post_id;
  Post.findByIdAndDelete(post_id, (err, post) => {
    if(err) res.status(400).send(err);
    // delete ref of this post from user
    console.log(post)
    User.findById(post.user).then(user => {
      user.posts.pull(post._id);
      user.save();
    })
    // delete the comments of the post as well
    Comment.deleteMany({post_id: { $eq: post._id }});
    res.status(200).send({message: "Post deleted!", post})
  })

});
module.exports = router;

