const express = require("express");
const router = express.Router();

router.get("/", (res, req, next) => {
  res.send("API is working properly");
})

module.exports = router;