const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, async (err, user) => {
    if(err) return done(err);
    if(!user) return done(null, false, { message: "Incorrect Username."});
    const match = await user.verifyPassword(password);
    if(!match) return done(null, false, { message: "Incorrect Password."});
    return done(null, user);
  })
}))
module.exports = passport;