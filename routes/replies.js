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
    res.status(400).send(err);
  })
})
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