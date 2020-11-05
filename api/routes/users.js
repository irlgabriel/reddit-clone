var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET - Retrieve all users */
router.get('/', (req, res, next) => {
  User.find((err, docs) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(docs);
    }
    
  });
});
/* POST - Register User */
router.post('/', (req, res, next) => {
  const user = User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(() => res.status(200).send("User created successfully"))
  .catch(err => res.status(400).json(err))
})
module.exports = router;
