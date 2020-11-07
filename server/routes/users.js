var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var User = require('../models/users');

async function checkUser(user, password) {
  bcrypt.compare(password, user.password)
  .then((match) => {
    return match;
  })
  .catch((err) => {
    throw err;
  })
}

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

  bcrypt.hash(password, 10)
  .then(hashedPassword => {
    User.create({
      username: username,
      email: email,
      password: hashedPassword
    })
    .then(user => {
      jwt.sign(
        {
          id: user.id,
        },
        "JWTSECRET",
        { expiresIn: 3600 },
        (err, token) => {
          if(err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name
            }
          })
        }
      )
      res.status(200).send(user);
    })
    //.catch(err => res.status(400).send(err))
  })
  
})

// POST - Login
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).send({msg: "Please enter all fields"});
  User.findOne({username}, (err, user) => {
    if(err) throw err;
    if(!user) return res.status(400).send({msg: "User does not exist"});
    if (checkUser(user, password)) {
      jwt.sign({id: user.id}, "JWTSECRET", (err, token) => {
        if(err) throw err;
        if(token) {
          res.status(200).json({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.username
            }
          })
        } else {
          res.status(400).send({msg:"no jwt token"})
        }
      })
    }
  })
})

module.exports = router;