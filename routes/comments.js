var express = require("express");
var router = express.Router({mergeParams: true});
// Comments base route : /posts/:post_id/comments 

const Comment = require("../models/comments");

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
    if(comm.downvotes.includes(user_id)) comm.downvotes = comm.downvotes.filter(downvote => downvote !== user_id);

    // Check if current user upvoted this previously
    comm.upvotes.includes(user_id) 
    ? comm.upvotes = comm.upvotes.filter(upvote => upvote !== user_id)
    : comm.upvotes.push(user_id);
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
/* PUT - edit post route */
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
    if(user_id !== doc.user_id) res.status(403).send({msg: "Forbidden"})
    if(err) res.status(400).send(err);
    res.status(200).send(doc);
  })
})
module.exports = router;
