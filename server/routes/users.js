var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
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
  const {username, email, password} = req.body;
  User.findOne({username: username})
  .then(user => {
    if(user) res.status(400).send("User already exists!")
  })
  .catch(err => res.status(400).send(err))
  bcrypt.hash(password, 10).then(hashedPassword =>
    User.create({
      username: username,
      email: email,
      password: hashedPassword
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.status(400).send(err))
  )
  
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).send({msg: "Please enter all fields"});

  User.findOne({username: username})
  .then(user => {
    console.log(user)
    if(!user) return res.status(400).send({msg: "User does not exist"});
    bcrypt.compare(password, user.password)
    .then(result => 
      result ? res.status(200).send("Logged in successfully") : res.status(400).send("Incorrect password")
    )
    .catch(err => res.status(400).send(err))
  })
  .catch(err => res.status(400).send(err))
})

module.exports = router;