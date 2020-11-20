var express = require("express");
var router = express.Router({mergeParams: true});
// Comments base route : /posts/:post_id/comments 

const Comment = require("../models/comments");
const Post = require("../models/posts");
const User = require("../models/users");

// Base route url: /posts/:post_id/comments/
// GET - Get comments of post_id
router.get("/", (req, res, next) => {
  const post_id = req.params.post_id;
  Comment.find({post_id: post_id})
  .then(async(comments) => {
    //const post = await Post.findById(post_id);
    //await post.populate('comments').execPopulate();
    res.status(200).send(comments);
  })
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  })
})

// POST - Post a comment
router.post("/", (req, res, next) => {
  const post_id = req.params.post_id;

  const user_id = req.body.user_id;
  const content = req.body.content;
  new Comment({
    user_id: user_id,
    post_id: post_id,
    content: content,
  })
  .save()
  .then(async (comm) => {
    await Post.updateOne({_id: comm.post_id}, {$push: { comments: comm._id}});
    await User.updateOne({_id: comm.user_id}, {$push: { comments: comm._id}});
    res.status(200).send({message: "Comment posted!", comment: comm});
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
  const comment_id = req.params.comment_id;
  Comment.findByIdAndDelete(comment_id, async (err, comment) => {
    if(err) res.status(400).send(err);

    // delete refs of this doc from user and post docs;
    await User.updateOne({_id: comment.user_id}, {$pull: { comments: comment._id}});
    await Post.updateOne({_id: comment.post_id}, {$pull: { comments: comment._id}});
    res.status(200).send({message:"Comment deleted!", comment: comment});
  })
})
module.exports = router;
