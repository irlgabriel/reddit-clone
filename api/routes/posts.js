

var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
  res.send("List of all posts")
})

module.exports = router;