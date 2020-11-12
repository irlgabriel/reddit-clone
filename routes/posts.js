var express = require("express");
var router = express.Router();
var Post = require("../models/posts");

/* GET - retrieve all posts */
router.get("/", (req, res, next) => {
  Post.find((err, docs) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(docs);
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
router.post("/:post_id/upvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;

  Post.findById(post_id, (err, post) => {
    if(err) console.log(err);

    // Check if user downvoted this and remove it;
    post.downvotes = post.downvotes.filter(downvote => downvote !== user_id)
    // Check if user upvoted this and remove it;
    post.upvotes.includes(user_id)
    ? post.upvotes = post.upvotes.filter(upvote => upvote !== user_id)
    : post.upvotes.push(user_id);

    // Now save
    post.save((err, post) => {
      if(err){
        res.status(400).send(err);
      } else {
        res.status(200).send(post);
      }
      
    })
  })
})
// POST - downvote a post
router.post("/:post_id/downvote", (req, res, next) => {
  const post_id = req.params.post_id
  const user_id = req.body.user_id;

  Post.findById(post_id, (err, post) => {
    if(err) console.log(err);

    // Check if user upvoted this and remove it;
    post.upvotes = post.upvotes.filter(upvote => upvote !== user_id)  
     // Check if user downvoted this and remove it;
     post.downvotes.includes(user_id)
     ? post.downvotes = post.downvotes.filter(downvote => downvote != user_id)
     :  post.downvotes.push(user_id)

    // Now save
    post.save((err, post) => {
      if(err){
        res.status(400).send(err);
      } else {
        res.status(200).send(post);
      }
    })
    
  })
})
// POST - deletes a post
router.delete("/:post_id", (req, res, next) => {
  const postId = req.params.post_id;
  // Find and delete the post form the "posts" collection
  Post.findByIdAndDelete(postId)
    .then((post) => res.status(200).send(post))
    .catch((err) => res.status(400).send(err));
});
module.exports = router;
