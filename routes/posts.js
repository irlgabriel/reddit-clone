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
/* GET - retrieve post with id */
router.get("/:post_id", (req, res, next) => {
  Post.findById(req.params.post_id, (err, post) => {
    if(err) res.status(400).send(err);
    res.status(200).send(post);
  })
})

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


  /*
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
  */
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
    

   



  /*
  
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
    res.status(200).send(post) // note to help debug: repsonse comes back 200 even when no user_id is sent;
  })
  */
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
