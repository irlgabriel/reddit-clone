var express = require('express');
var router = express.Router();
var Post = require("../models/posts");

/* GET - retrieve all posts */
router.get("/", (req, res, next) => {
  Post.find((err,docs) =>{
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
  })
})

module.exports = router;