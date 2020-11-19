var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var passport = require('../config/passport'); 
var User = require("../models/users");

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

/* POST - Register User */
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
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
  res.send({user: req.user});
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
