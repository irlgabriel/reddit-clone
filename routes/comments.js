const express = require("express");
const router = express.Router({mergeParams: true});
// Comments base route : /posts/:post_id/comments 

const Comment = require("../models/comments");

// GET - Get comments of post_id
router.get("/", (req, res, next) => {
  const post_id = req.params.post_id;
  Comment.find({post_id: post_id})
  .exec((err, comments) => {
    if(err) res.status(400).send(err);
    res.status(200).send(comments);
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
  }, (err, comm) => {
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Comment posted!", comment: comm});
  })

})

// POST - Upvote a comment
router.post("/:comment_id/upvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id)
  .exec((err, comment) => {
    if(err) res.status(400).send(err);
    comment.upvoteComment(user_id);
    res.send(comment);
  })
})

// Post - Downvote a comment
router.post("/:comment_id/downvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id)
  .exec((err, comment) => {
    if(err) res.status(400).send(err);
    comment.downvoteComment(user_id);
    res.send(comment);
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
  const comment_id = req.params.comment_id;
  Comment.findOneAndRemove({_id:comment_id} , (err, comment) => {
    if(err) res.status(400).send(err);
    comment.remove();
    res.status(200).send({message:"Comment deleted!", comment: comment});
  })
})
module.exports = router;
