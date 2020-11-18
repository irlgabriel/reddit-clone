const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/users');

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    console.log(user);
    if(err) return done(err);
    if(!user) return done(null, false);
    if(!user.verifyPassword(password)) return done(null, false);
    return done(null, user);
  })
}))


module.exports = passport;