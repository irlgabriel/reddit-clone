var express = require("express");
var router = express.Router({mergeParams: true});
// Comments base route : /posts/:post_id/comments 

const Comment = require("../models/comments");

// GET - Get comments of post_id
router.get("/", (req, res, next) => {
  const post_id = req.params.post_id;
  Comment.find()
  .then(comments => {
    comments.filter(comment => comment.post_id === post_id);
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
    res.status(200).send(comm);
  })
  .catch(err => {
    res.status(400).send(err);
  })
})
// Post - Upvote a comment
router.post("/:comment_id/upvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id, (err, comm) => {
    if(err) res.status(400).send(err);

    // Check if user downvoted this previously and remove it!
    if(comm.downvotes.includes(user_id)) comm.downvotes.filter(downvote => downvote !== user_id);

    // Check if current user upvoted this previously
    comm.upvotes.includes(user_id) 
    ? comm.upvotes.filter(upvote => upvote !== user_id)
    : comm.upvotes.push(user_id);
    // Save and send res back
    comm.save((err, doc) => {
      if(err) res.status(400).send(err);
      res.status(200).send(doc);
    })

    /*
    // First check if the user downvoted this post and remove the downvote
    if (comm.downvotes.includes(user_id)) ({$pull: {downvotes: user_id}}, {new: true}, (err, updatedComm) => {
      if(err) res.status(400).send(err)
      res.send(updatedComm);
    });

    // Now check if the user already liked this post and remove the like if that is the case
    if(comm.upvotes.includes(user_id)) {
      comm.update({$pull: {upvotes: user_id}}, {new: true}, (err, updatedComm) => {
        if(err) res.status(400).send(err)
        res.status(200).send(updatedComm);
      })
    } else {
      comm.update({$push: {upvotes: user_id}}, {new: true}, (err, updatedComm) => {
        if(err) res.status(400).send(err)
        res.status(200).send(updatedComm);
      })
    }
    */
    
    
  })
})

// Post - Downvote a comment
router.post("/:comment_id/downvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id, (err, comm) => {
    if(err) res.status(400).send(err);

    // First check if the user upvoted this post and remove the upvote
    if (comm.upvotes.includes(user_id)) comm.update({$pull: {upvotes: user_id}}, {new: true}, (err, updatedComm) => {
      if(err) res.status(400).send(err)
      res.send(updatedComm);
    });

    // Now check if the user already downvoted this post and remove the downvote if that is the case
    if(comm.downvotes.includes(user_id)) {
      comm.update({$pull: {downvotes: user_id}}, {new: true}, (err, updatedComm) => {
        if(err) res.status(400).send(err)
        res.status(200).send(updatedComm);
      })
    } else {
      comm.update({$push: {downvotes: user_id}}, {new: true}, (err, updatedComm) => {
        if(err) res.status(400).send(err)
        res.status(200).send(updatedComm);
      })
    }
    
  })
})
module.exports = router;
