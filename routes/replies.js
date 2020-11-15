var express = require('express');
var router = express.Router({mergeParams: true});

const Reply = require("../models/replies");

// GET - retrieve replies of comment
router.get("/", (req, res, next) => {
  const comment_id = req.params.comment_id;
  Reply.find((err, docs) => {
    if(err) res.status(400).send(err);
    const replies = docs.filter(doc => doc.comment_id === comment_id);
    res.status(200).send(replies);
  })
})
// POST - create a reply
router.post("/", (req, res, next) => {
  const comment_id = req.params.comment_id;
  const user_id = req.body.user_id;
  const content = req.body.content;
  Reply.create({
    user_id,
    comment_id,
    content,
  })
  .then(doc => {
    res.status(200).send(doc);
  })
  .catch(err => {
    console.log(err)
    res.status(400).send(err);
  })
})

// POST = Upvote Reply
router.post("/:reply_id/upvote", (req, res, next) => {
  const user = req.body.user_id;
  Reply.findById(req.params.reply_id, (err, doc) => {
    if(err) res.status(400).send(err);

    // Is this comment previously downvoted? remove it if yes;
    if(doc.downvotes.includes(user)) doc.downvotes = doc.downvotes.filter(downvote => downvote !== user);

    // Is this comment already upvoted? remove it if yes, upvote it if no
    doc.upvotes.includes(user) 
    ? doc.upvotes = doc.upvotes.filter(upvote => upvote !== user) 
    : doc.upvotes.push(user);

    doc.save((err, doc) => {
      if(err) res.status(400).send(err)
      res.status(200).send(doc);
    })
  })
})

// POST = Upvote Reply
router.post("/:reply_id/downvote", (req, res, next) => {
  const user = req.body.user_id;
  Reply.findById(req.params.reply_id, (err, doc) => {
    if(err) res.status(400).send(err);

    // Is this comment previously upvoted? remove it if yes;
    if(doc.upvotes.includes(user)) doc.upvotes = doc.upvotes.filter(upvote => upvote !== user);

    // Is this comment already upvoted? remove it if yes, upvote it if no
    doc.downvotes.includes(user) 
    ? doc.downvotes = doc.downvotes.filter(upvote => upvote !== user) 
    : doc.downvotes.push(user);

    doc.save((err, doc) => {
      if(err) res.status(400).send(err)
      res.status(200).send(doc);
    })
  })
})
// PUT - Edit reply
router.put('/:reply_id', (req, res, next) => {
  const user = req.body.user_id;
  const content = req.body.content;

  Reply.findByIdAndUpdate(req.params.reply_id, {content: content}, {new: true}, (err, doc) => {
    if(doc.user_id !== user) res.status(403).send({msg: "Forbidden"});
    if(err) res.status(400).send(err);
    res.status(200).send(doc);
  })
})
module.exports = router;