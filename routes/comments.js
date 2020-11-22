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

 // Get - get replies of comment
 router.get("/:comment_id/replies", (req, res, next) => {
   Comment.find({comment_id: req.params.comment_id})
   .then(replies => {
    res.status(200).send(replies);
   })
   .catch(err => res.status(400).send(err))
 })

// GET - Get a comment
router.get("/:comment_id", (req, res, next) => {
  Comment.findOne({_id: req.params.comment_id})
  .populate('user_id')
  .exec(function (err, comment) {
    if(err) res.status(400).send(err);
    res.status(200).send(comment.user_id);
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

// POST - Post a reply to a comment
router.post("/:comment_id", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  const content = req.body.content;
  Comment.create({comment_id, user_id, content})
  .then(reply => {
    res.json({message: "Reply created successfully", reply: reply})
  })
  .catch(err => console.log(err))

})

// POST - Upvote a comment
router.post("/:comment_id/upvote", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  Comment.findById(comment_id)
  .exec((err, comment) => {
    if(err) res.status(400).send(err);
    res.status(200).send((comment.upvoteComment(user_id)));
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
  Comment.findOneAndUpdate({_id:comment_id}, updated_obj, {new: true}, (err, doc) => {
    if(user_id != doc.user_id) return res.status(403).send({message: "Forbidden"})
    if(err) res.status(400).send(err);
    res.status(200).send({message: "Comment edited!", comment: doc});
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
