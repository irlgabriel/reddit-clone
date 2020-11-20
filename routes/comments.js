var express = require("express");
var router = express.Router({mergeParams: true});
// Comments base route : /posts/:post_id/comments 

const Comment = require("../models/comments");
const Post = require("../models/posts");
const User = require("../models/users");

// GET - Get comments of post_id
router.get("/", (req, res, next) => {
  const post_id = req.params.post_id;
  Comment.find({post_id: post_id})
  .then(comments => {
    res.status(200).send(comments);
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

// POST - Post a comment
router.post("/", (req, res, next) => {
  const post_id = req.params.post_id;

  const user_id = req.body.user_id;
  const content = req.body.content;
  Comment.create({
    user_id: user_id,
    post_id: post_id,
    content: content,
  })
  .then(comm => {
    // Add a reference of this comment to the post that it was made to;
    Post.findById(post_id, (err, post) => {
      if(err) res.status(400).send(err);
      post.comments.push(comm._id);
      post.save();
    })
    res.status(200).send({message: "Comment posted!", comment: comm});
    // Add a reference of this comment to the user that created it
    User.findById(user_id, (err, user) => {
      if(err) res.status(400).send(err);
      user.comments = user.comments.filter(userComment => userComment !== comm._id)
    })
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

// POST - Upvote a comment
router.post("/:comment_id/upvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id, (err, comm) => {
    if(err) res.status(400).send(err);

    // Check if user downvoted this previously and remove it!
    if(comm.downvotes.includes(user_id)) {
      // Remove downvote from comment;
      comm.downvotes = comm.downvotes.filter(downvote => downvote !== user_id);
      // Remove it from user's document;
    }

    // Check if current user upvoted this previously
    if(comm.upvotes.includes(user_id)) {
      comm.upvotes = comm.upvotes.filter(upvote => upvote !== user_id)
    } else {
      comm.upvotes.push(user_id);
    }
    // Save and send res back
    comm.save((err, doc) => {
      if(err) res.status(400).send(err);
      res.status(200).send(doc);
    })
    
  })
})

// Post - Downvote a comment
router.post("/:comment_id/downvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id, (err, comm) => {
    if(err) res.status(400).send(err);

    // First check if the user upvoted this post and remove the upvote
    if (comm.upvotes.includes(user_id)) comm.upvotes = comm.upvotes.filter(upvote => upvote !== user_id);

    // Now check if the user already downvoted this post and remove the downvote if that is the case
    comm.downvotes.includes(user_id)
    ? comm.downvotes = comm.downvotes.filter(downvote => downvote !== user_id)
    : comm.downvotes.push(user_id)
    // Save and send res back
    comm.save((err, doc) => {
      if(err) res.status(400).send(err);
      res.status(200).send(doc);
    })
  })
})
/* PUT - edit comment route */
router.put("/:comment_id", (req, res, next) => {
  // send id of use who sends the request and see if it matches comment creator
  const user_id = req.body.user_id;
  const comment_id = req.params.comment_id;
  const updated_obj = {};
  Object.keys(req.body).forEach(obj => {
    if(obj !== 'user_id') {
      updated_obj[obj] = req.body[obj];
    }
  })
  Comment.findByIdAndUpdate(comment_id, updated_obj, {new: true}, (err, doc) => {
    if(user_id !== doc.user_id) res.status(403).send({message: "Forbidden"})
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Comment edited!", doc});
  })
})

// DELETE - delete a comment
router.delete("/:comment_id", (req, res, next) => {
  const user_id = req.body.user_id;
  const comment_id = req.params.comment_id;
  Comment.findByIdAndDelete(comment_id, (err, comment) => {
    console.log(comment);
    if(err) res.status(400).send(err);
    // Delete the reference of this comment from the post
    Post.findById(comment.post_id, (err, post) => {
      if(err) res.status(400).send(err);
      console.log(post);
      post.comments = post.comments.filter(postComment => postComment !== comment._id)
      post.save();
    })
    // Delete the reference of this comment from the user
    User.findById(comment.user_id, (err, user) => {
      if(err) res.status(400).send(err);
      user.comments = user.comments.filter(userComment => userComment !== comment._id)
      user.save();
    })
    res.status(200).send({message:"Comment deleted!", comment: comment});
  })
})
module.exports = router;
