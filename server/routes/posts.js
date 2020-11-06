var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Post = require("../models/posts");
var Subreddit = require("../models/subreddits");
var User = require("../models/users");

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
  .then((post) => {
    // Append a reference to this post to the Subreddit document that it belongs to
    Subreddit.findOne({name: subreddit})
    .then(sub => {
      if(sub) {
        sub.posts.push(post._id)
        sub.save();
      } else {
        console.log(`subreddit ${subreddit} doesn't exist`);
      }
    })
    // Append a reference to this post to the User document that it belongs to
    User.findOne({username: user})
    .then(currentUser => {
      if(currentUser) {
        currentUser.posts.push(post._id)
        currentUser.save();
      } else {
        console.log(`user ${user} does not exist`);
      }
    })
    res.status(200).send(post)
  })
  .catch(err => res.status(400).send(err))
})

// POST - deletes a post
router.delete("/:id", (req, res, next) => {
  const postId = req.params.id;

  // Find and delete the post form the "posts" collection
  Post.findOneAndDelete({_id: postId})
  .then((doc => {
    // We also delete its reference from the subreddit it was posted on
    Subreddit.findOne({name: doc.subreddit})
    .then(sub => sub.posts.filter(subPost => subPost._id !== doc._id))
    // And finally delete the reference from the user's posts
    User.findOne({username: doc.user})
    .then(user => user.posts.filter(userPost => userPost._id) !== doc._id)
    res.status(200).send(doc)
  }))
  
  
})
module.exports = router;