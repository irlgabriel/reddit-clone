const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('../config/passport'); 

const Comment = require("../models/comments");
const User = require("../models/users");
const Post = require("../models/posts");

/* GET - Retrieve all users */
router.get("/", (req, res, next) => {
  User.find((err, docs) => {
    if (err) res.status(400).send(err);
    res.status(200).send(docs);
  });
});

/* GET - Retrieve user with user_id */
router.get("/:user_id", (req, res, next) => {
  User.findById(req.params.user_id, (err, user) => {
    if(err) res.status(400).send(err);
    res.status(200).send(user)
  })
})

/* GET - retireve karma info */
router.get("/:user_id/karma", (req, res, next) => {
  let karma = 0;
  const user_id = req.params.user_id;
  Promise.all([
    Post.find({user: user_id})
    .then(posts => {
      posts.forEach(post => karma += post.upvotes.length - post.downvotes.length)
    }),
    Comment.find({user_id: user_id})
    .then(comments => {
      comments.forEach(comment => karma += comment.upvotes.length - comment.downvotes.length)
    })
  ])
  .then(() => {
    res.status(200).send({karma: karma});
  })
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  })
})

/* POST - Register User */
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  if(!password || !email || !password) res.status(400).send({message: "You need to fill in all fields"})

  const isUsernameUsed = await User.findOne({ username: username })
  const isEmailUsed = await User.findOne({ email: email })
  if(isEmailUsed) {
    res.status(400).send({message: "Email already in use"})
    return;
  }
  if(isUsernameUsed) {
    res.status(400).send({message: "Username already in use"})
    return;
  }
  bcrypt.hash(password, 10)
  .then((hashedPassword) => {
    User.create({
      username: username,
      email: email,
      password: hashedPassword,
    })
      .then((user) => {
        res.status(200).send({ message: "Registered Successfully", user });
      })
  });
});

// POST - Login
router.post("/login", passport.authenticate('local'), (req,res) => {
  req.user
  ? res.status(200).send({user: req.user})
  : res.status(400).send({message: "Username or password invalid"})
})

// POST - Logout
router.post("/logout", (req, res, next) => {
  req.logout();
  res.send({message: "Logged out successfully!"})
});

// GET - Dummy route to check if user is logged in
router.post("/logged_in", (req, res, next) => {
  res.status(200).send({user: req.user});
})

module.exports = router;

