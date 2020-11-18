require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require('passport');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

app.use(logger("dev"));
app.use(session({secret:"secret", saveUninitialized: true, resave: false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));

mongoose.connect(process.env.DB_STRING,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
const db = mongoose.connection;
db.once('open', () => {
  console.log("Connected to mongoDB")
})

/*
app.use(session({ 
  store: new MongoStore({mongooseConnection: db}),
  saveUninitialized: true,
  resave: false,
  secret: process.env.SESSION_SECRET
}))
*/
app.use(passport.initialize());
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.user);
  console.log(req.session);
  next();
})

// import Routers
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const subredditsRouter = require("./routes/subreddits");
const commentsRouter = require("./routes/comments");
const repliesRouter = require("./routes/replies");



// Route handlers
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/subreddits", subredditsRouter);
app.use("/posts/:post_id/comments", commentsRouter);
app.use("/posts/:post_id/comments/:comment_id", repliesRouter);

if (process.env.NODE_ENV == "production") {
  // Set a static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
