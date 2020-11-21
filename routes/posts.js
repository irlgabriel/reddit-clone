const express = require("express");
const router = express.Router();

const Post = require("../models/posts");
const Subreddit = require("../models/subreddits");

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

/* GET - retrieve post by id */
router.get('/:post_id', (req, res, next) => {
  Post.findOne({_id: req.params.post_id})
  .populate('user')
  .exec((err, post) => {
    if(err) res.status(400).send(err);
    res.json(post);
  })
})

/* POST - Create a post */
router.post("/", async (req, res, next) => {
  const { title, subreddit, user, content } = req.body;
  const subredditObject = await Subreddit.findOne({name: subreddit});

  new Post({
    title: title,
    subreddit: subredditObject.name,
    user: user._id, // object!
    content: content,
  })
    .save()
    .then(async (post) => {
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
  Post.findOneAndUpdate({_id: req.params.post_id}, updated_obj, {new: true}, (err, doc) => {
    if(err) res.status(400).send(err);

    // Check if user that submited the request is the creator
    if(doc.user != user_id) return res.status(403).send({message: "Forbidden"})
    res.status(200).send({message: "Post edited!", post: doc});
  })
})

// DELETE - deletes a post
router.delete("/:post_id", async (req, res, next) => {
  const post_id = req.params.post_id;

  Post.findByIdAndDelete(post_id, async (err, post) => {
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Post deleted!", post})
  })

});
module.exports = router;

