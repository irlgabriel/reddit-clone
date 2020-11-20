var express = require("express");
var router = express.Router();
var Post = require("../models/posts");
var Subreddit = require("../models/subreddits");
const User = require("../models/users");

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
    .then((post) => {
      // Add a ref to this post to the user document;
      User.findById(user._id, (err, user) => {
        if(err) res.status(400).send(err);
        user.push(post._id);
        user.save();
      })
      // Add a ref to this post to the subreddit document;
      Subreddit.findById(getSubredditId(subreddit), (err, subreddit) => {
        if(err) res.status(400).send(err);
        subreddit.posts = subreddit.posts.filter(subredditPost => subredditPost !== post._id)
        subreddit.save();
      })
      res.status(200).send({message: "Post created!", post: post})
    })
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
    res.status(200).send(post.downvotePost(user_id));
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
  Post.findByIdAndDelete(postId, (err, post) => {
    if(err) res.status(400).send(err);
    // Delete the reference from the user
    User.findById(post.user, (err, user) => {
      user.posts = user.posts.filter(userPost => userPost !== post._id)
      user.save();
    })
    // Delete the reference from the subreddit
    Subreddit.findById(post.subreddit, (err, subreddit) => {
      if(err) res.status(400).send(err);
      subreddit.posts = subreddit.posts.filter(subredditPost => subredditPost !== post._id);
      subreddit.save();
    })
    res.status(200).send({message: "Post deleted!", post})
  })

});
module.exports = router;

