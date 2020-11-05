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
router.post('/register', (req, res, next) => {
  const user = User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(() => res.status(200).send("User created successfully"))
  .catch(err => res.status(400).json(err))
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).send({msg: "Please enter all fields"});

  User.findOne({username})
  .then(user => {
    if(!user) return res.status(400).send({msg: "User does not exist"});
    if(user.password !== password) {
      return res.status(400).send({msg: "Incorrect Password"});
    } else {
      return res.status(200).send({msg: "Login successful"})
    }
  })
  .catch(err => res.status(400).send(err))
})

module.exports = router;